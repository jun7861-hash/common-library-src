/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import MaterialIcon from 'material-icons-react'
import ScrollArea from 'react-scrollbar'
import classname from 'classnames'
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
  useExpanded,
  useResizeColumns
} from 'react-table'
import * as types from './types'
import './index.scss'
import IndeterminateCheckbox from './indeterminate'
import { useTranslation } from 'react-i18next'
import { i18n } from '../common/locale/localeIndex'

const renderHeader = (column: any) => {
  const classTh = classname({
    th: true,
    [column.headerClassName]: column.headerClassName,
    'th-sort': column.sortable && column.canSort,
    'th-sort-desc': column.isSorted && column.isSortedDesc,
    'th-sort-asc': column.isSorted && !column.isSortedDesc
  })
  const classSort = classname({
    'th-inner-sort': column.sortable && column.canSort,
    'th-inner-sort-desc': column.isSorted && column.isSortedDesc,
    'th-inner-sort-asc': column.isSorted && !column.isSortedDesc
  })
  const styleTh = {
    flex: column.width + ' 0 auto',
    width: column.width + 'px',
    maxWidth:
      column.maxWidth && column.maxWidth <= 1000
        ? column.maxWidth + 'px'
        : 'auto'
  }
  return column.sortable ? (
    <div
      {...column.getHeaderProps(column.getSortByToggleProps())}
      style={{ ...styleTh }}
      className={classTh}
    >
      <div className={classSort}>{column.render('Header')}</div>
      {column.resizable ? (
        <div {...column.getResizerProps()} className='resizer' />
      ) : (
        ''
      )}
    </div>
  ) : (
    <div
      {...column.getHeaderProps()}
      style={{ ...styleTh }}
      className={classTh}
    >
      <div>{column.render('Header')}</div>
      {column.resizable ? (
        <div {...column.getResizerProps()} className='resizer' />
      ) : (
        ''
      )}
    </div>
  )
}

const renderFilter = (column: any) => {
  const styleTh = {
    flex: column.width + ' 0 auto',
    width: column.width + 'px',
    maxWidth:
      column.maxWidth && column.maxWidth <= 1000
        ? column.maxWidth + 'px'
        : 'auto'
  }
  return (
    <div className='th' {...column.getHeaderProps()} style={{ ...styleTh }}>
      <div>{column.canFilter ? column.render('Filter') : null}</div>
    </div>
  )
}

const renderBodyColumn = (cell: any, row: any, renderRowSubComponent: any) => {
  const classTd = classname({
    td: true,
    [cell.column.columnClassName]: cell.column.columnClassName
  })
  const styles = {
    flex: cell.column.width + ' 0 auto',
    width: cell.column.width,
    maxWidth:
      cell.column.maxWidth && cell.column.maxWidth <= 1000
        ? cell.column.maxWidth + 'px'
        : 'auto'
  }
  return (
    <div {...cell.getCellProps()} className={classTd} style={{ ...styles }}>
      {cell.render('Cell')}
      {renderRowSubComponent && renderRowSubComponent
        ? renderRowSubComponent({ row })
        : ''}
    </div>
  )
}

const EditableTable: React.FC<types.EditableTableTypes> = ({
  texts,
  wrapperClassName,
  innerRef,
  innerProps,
  isBodyScroll,
  tableClassName,
  columns,
  data,
  showPagination,
  isLoading,
  sortBy,
  updateSelectedItem,
  renderRowSubComponent,
  tableId,
  maxHeight = '400',
  limitSelection,
  typeSelectCheckbox,
  fetchData,
  pageCount: controlledPageCount
}) => {
  const languageDetector = useTranslation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)
  const DefaultColumnFilter = () => null
  const selectionHook = (hooks: any) => {
    if (typeSelectCheckbox) {
      hooks.visibleColumns.push((columns: any) => [
        {
          id: '_selector',
          Header: ({ getToggleAllRowsSelectedProps, ...rest }) => {
            const handlePageRemoveCurrents = () => {
              rest.page.forEach((row: any) => {
                rest.page.forEach((row: any) => {
                  row.isSelected === false
                    ? (row.isSelected = true)
                    : (row.isSelected = row.isSelected)
                })
                rest.toggleRowSelected(row.id)
              })
            }

            const handleChange = () => {
              if (rest.selectedFlatRows.length > 0) {
                if (rest.selectedFlatRows.length === data.length) {
                  handleAllRemoveCurrents()
                } else {
                  handlePageRemoveCurrents()
                  handleAllRemoveCurrents()
                }
              } else {
                rest.page.forEach((row: any) => {
                  rest.toggleRowSelected(row.id)
                })
              }
            }

            const handleAllRemoveCurrents = () => {
              rest.rows.forEach((row: any) => {
                rest.rows.forEach((row: any) => {
                  row.isSelected === false
                    ? (row.isSelected = true)
                    : (row.isSelected = row.isSelected)
                })
                rest.toggleRowSelected(row.id)
              })
            }

            const handleAllChange = () => {
              if (rest.selectedFlatRows.length > 0) {
                handleAllRemoveCurrents()
              } else {
                rest.rows.forEach((row: any) => {
                  rest.toggleRowSelected(row.id)
                })
              }
            }
            return (
              <React.Fragment>
                {typeSelectCheckbox.length !== 0 && (
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    className='tableDropdown'
                    size='md'
                  >
                    <DropdownToggle caret tag='div' className='dropdown-toggle'>
                      <label style={{ margin: 0 }}>
                        {typeSelectCheckbox[0] === i18n.t('defaultText_all') ? (
                          <IndeterminateCheckbox
                            {...getToggleAllRowsSelectedProps()}
                            disabled={limitSelection}
                            onChange={handleAllChange}
                          />
                        ) : (
                          <IndeterminateCheckbox
                            {...getToggleAllRowsSelectedProps()}
                            disabled={limitSelection}
                            onChange={handleChange}
                          />
                        )}
                      </label>
                    </DropdownToggle>
                    <DropdownMenu positionFixed>
                      {typeSelectCheckbox.map((dropdown, id) => (
                        <DropdownItem key={id} tag='div'>
                          <label>
                            <IndeterminateCheckbox
                              {...getToggleAllRowsSelectedProps()}
                              disabled={limitSelection}
                              onChange={
                                dropdown === i18n.t('defaultText_all')
                                  ? handleAllChange
                                  : handleChange
                              }
                            />
                            {dropdown}
                          </label>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )}
              </React.Fragment>
            )
          },
          width: 60,
          maxWidth: 60,
          Cell: ({ row }) => {
            return (
              <IndeterminateCheckbox
                disabled={limitSelection}
                {...row.getToggleRowSelectedProps()}
              />
            )
          }
        },
        ...columns
      ])
    }
  }
  const hooks = [selectionHook]

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    [dropdownOpen, languageDetector.i18n.language]
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateSelectedItem,
      pageCount: controlledPageCount,
      initialState: {
        sortBy: sortBy || [],
        pageIndex: 0,
        pageSize: 10
      }
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useResizeColumns,
    ...hooks
  )

  useEffect(() => {
    setHiddenColumns(
      columns
        .filter((column) => {
          return column.isVisible !== undefined && !column.isVisible
        })
        .map((column) => column.accessor)
    )
    if (updateSelectedItem) {
      const selectedItems = selectedFlatRows.map((d) => d.original)
      updateSelectedItem(selectedItems)
    }
    fetchData({ pageIndex, pageSize })
  }, [
    sortBy,
    fetchData,
    pageIndex,
    pageSize,
    setHiddenColumns,
    columns,
    selectedFlatRows,
    languageDetector.i18n.language
  ])

  const hasFilter = columns.filter((e) => e.Filter).length > 0

  const containerClassName = classname(
    wrapperClassName,
    'cpwrapper cp-table-wrapper'
  )
  const containerTableClassName = classname(tableClassName, 'table')
  return (
    <div {...innerProps} ref={innerRef} className={`${containerClassName}`}>
      <div className='table-responsive'>
        <div
          className={`${containerTableClassName}`}
          id={tableId}
          {...getTableProps()}
        >
          <div className='thead'>
            {headerGroups.map((headerGroup: any, index: number) => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                className='tr'
                key={index}
              >
                {headerGroup.headers.map((column: any, index: number) => (
                  <React.Fragment key={index}>
                    {renderHeader(column)}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
          <div className='thead filter'>
            {headerGroups.map((headerGroup: any, index: number) => (
              <div
                style={{ display: hasFilter ? 'inherit' : 'none' }}
                className='tr'
                key={index}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column: any, index: number) => (
                  <React.Fragment key={index}>
                    {renderFilter(column)}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
          {!data ? (
            <div className='tbody'>
              <div className='tr-nodata'>
                <div>{texts?.noData || i18n.t('tableText_noData')}</div>
              </div>
            </div>
          ) : isLoading ? (
            <div className='tbody'>
              <div className='tr-nodata'>
                <div>{texts?.loading || i18n.t('tableText_loading')}</div>
              </div>
            </div>
          ) : (
            <ScrollArea
              style={
                isBodyScroll
                  ? { width: '100%', maxHeight: `${maxHeight}px` }
                  : {}
              }
              smoothScrolling
              vertical={isBodyScroll}
              horizontal={false}
            >
              <div className='tbody' {...getTableBodyProps()}>
                {page.map((row: any, index: number) => {
                  prepareRow(row)
                  return (
                    <div className='tr' key={index} {...row.getRowProps()}>
                      {row.cells.map((cell: any, index: number) => {
                        return (
                          <React.Fragment key={index}>
                            {renderBodyColumn(cell, row, renderRowSubComponent)}
                          </React.Fragment>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
      {showPagination === true ? (
        <div className='pagination clearfix'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <Button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                size='xs'
                color='default'
              >
                <MaterialIcon icon='first_page' color='#999999' size='small' />
              </Button>
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                size='xs'
                color='default'
                title={texts?.previous || i18n.t('tableText_previous')}
              >
                <MaterialIcon
                  icon='chevron_left'
                  color='#999999'
                  size='small'
                />
              </Button>
            </InputGroupAddon>
            <div className='middle'>
              <span>
                {texts?.page || i18n.t('tableText_page')}{' '}
                <input
                  type='number'
                  value={pageIndex + 1}
                  onChange={(event) => {
                    const page = event.target.value
                      ? Number(event.target.value) - 1
                      : 0
                    gotoPage(page)
                  }}
                  style={{ width: '50px', height: '30px' }}
                  className='mr-2'
                />
                {texts?.of || i18n.t('tableText_of')} {pageOptions.length}
              </span>{' '}
              <select
                className='ml-2'
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} {texts?.rows || i18n.t('tableText_rows')}
                  </option>
                ))}
              </select>
            </div>
            <InputGroupAddon addonType='append'>
              <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                size='xs'
                color='default'
                title={texts?.next || i18n.t('tableText_next')}
              >
                <MaterialIcon
                  icon='chevron_right'
                  color='#999999'
                  size='small'
                />
              </Button>
              <Button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                size='xs'
                color='default'
              >
                <MaterialIcon icon='last_page' color='#999999' size='small' />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ) : showPagination === false ? (
        <React.Fragment />
      ) : showPagination === undefined && data.length > 10 ? (
        <div className='pagination clearfix'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <Button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                size='xs'
                color='default'
              >
                <MaterialIcon icon='first_page' color='#999999' size='small' />
              </Button>
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                size='xs'
                color='default'
                title={texts?.previous || i18n.t('tableText_previous')}
              >
                <MaterialIcon
                  icon='chevron_left'
                  color='#999999'
                  size='small'
                />
              </Button>
            </InputGroupAddon>
            <div className='middle'>
              <span>
                {texts?.page || i18n.t('tableText_page')}{' '}
                <input
                  type='number'
                  value={pageIndex + 1}
                  onChange={(event) => {
                    const page = event.target.value
                      ? Number(event.target.value) - 1
                      : 0
                    gotoPage(page)
                  }}
                  style={{ width: '50px', height: '30px' }}
                  className='mr-2'
                />
                {texts?.of || i18n.t('tableText_of')} {pageOptions.length}
              </span>{' '}
              <select
                className='ml-2'
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} {texts?.rows || i18n.t('tableText_rows')}
                  </option>
                ))}
              </select>
            </div>
            <InputGroupAddon addonType='append'>
              <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                size='xs'
                color='default'
                title={texts?.next || i18n.t('tableText_next')}
              >
                <MaterialIcon
                  icon='chevron_right'
                  color='#999999'
                  size='small'
                />
              </Button>
              <Button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                size='xs'
                color='default'
              >
                <MaterialIcon icon='last_page' color='#999999' size='small' />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  )
}

export const Table: React.FC<types.TableTypes> = ({
  wrapperClassName,
  texts,
  innerRef,
  innerProps,
  tableClassName,
  isBodyScroll,
  data,
  columns,
  showPagination,
  loading,
  tableId,
  sortBy,
  renderRowSubComponent,
  maxHeight,
  limitSelection,
  typeSelectCheckbox,
  updateSelectedItem
}) => {
  const languageDetector = useTranslation()
  const [item, setItem] = useState(data)
  const [load, setLoad] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchDatas = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current

    setLoad(true)

    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      const endRow = startRow + pageSize
      setItem(item.slice(startRow, endRow))

      setPageCount(Math.ceil(item.length / pageSize))

      setLoad(false)
    }
  }, [])

  useEffect(() => {}, [item, data, languageDetector.i18n.language])
  return loading ? (
    data.length <= 10 ? (
      <EditableTable
        onChange={() => {}}
        wrapperClassName={wrapperClassName}
        texts={texts}
        innerRef={innerRef}
        innerProps={innerProps}
        tableClassName={tableClassName}
        isBodyScroll={isBodyScroll}
        columns={columns}
        data={data}
        updateSelectedItem={updateSelectedItem}
        showPagination={showPagination}
        isLoading={load}
        tableId={tableId}
        maxHeight={maxHeight}
        renderRowSubComponent={renderRowSubComponent}
        sortBy={sortBy}
        limitSelection={limitSelection}
        typeSelectCheckbox={typeSelectCheckbox}
        fetchData={fetchDatas}
        pageCount={pageCount}
      />
    ) : (
      <EditableTable
        onChange={() => {}}
        wrapperClassName={wrapperClassName}
        texts={texts}
        innerRef={innerRef}
        innerProps={innerProps}
        tableClassName={tableClassName}
        isBodyScroll={isBodyScroll}
        columns={columns}
        data={data}
        updateSelectedItem={updateSelectedItem}
        showPagination={showPagination}
        isLoading={load}
        tableId={tableId}
        maxHeight={maxHeight}
        renderRowSubComponent={renderRowSubComponent}
        sortBy={sortBy}
        limitSelection={limitSelection}
        typeSelectCheckbox={typeSelectCheckbox}
        fetchData={fetchDatas}
        pageCount={pageCount}
      />
    )
  ) : data.length <= 10 ? (
    <EditableTable
      onChange={() => {}}
      wrapperClassName={wrapperClassName}
      texts={texts}
      innerRef={innerRef}
      innerProps={innerProps}
      tableClassName={tableClassName}
      isBodyScroll={isBodyScroll}
      columns={columns}
      data={data}
      updateSelectedItem={updateSelectedItem}
      showPagination={showPagination}
      tableId={tableId}
      maxHeight={maxHeight}
      renderRowSubComponent={renderRowSubComponent}
      sortBy={sortBy}
      limitSelection={limitSelection}
      typeSelectCheckbox={typeSelectCheckbox}
      fetchData={fetchDatas}
      pageCount={pageCount}
    />
  ) : (
    <EditableTable
      onChange={() => {}}
      wrapperClassName={wrapperClassName}
      texts={texts}
      innerRef={innerRef}
      innerProps={innerProps}
      tableClassName={tableClassName}
      isBodyScroll={isBodyScroll}
      columns={columns}
      data={data}
      updateSelectedItem={updateSelectedItem}
      showPagination={showPagination}
      tableId={tableId}
      maxHeight={maxHeight}
      renderRowSubComponent={renderRowSubComponent}
      sortBy={sortBy}
      limitSelection={limitSelection}
      typeSelectCheckbox={typeSelectCheckbox}
      fetchData={fetchDatas}
      pageCount={pageCount}
    />
  )
}
