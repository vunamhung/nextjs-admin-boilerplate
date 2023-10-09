import type { ReactNode } from 'react';
import type { ColumnDef, ExpandedState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table as MTable, Pagination, Select } from '@mantine/core';
import { DeleteButton } from '@/components';
import { http, isDev } from '@/utilities';
import { flexRender, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import { omit, pluck } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import toast from 'react-hot-toast';
import { FiChevronsDown, FiChevronsUp, FiInfo } from 'react-icons/fi';
import { HiChevronUpDown } from 'react-icons/hi2';
import { useSWRConfig } from 'swr';

export function Table<T>({ columns, data, totalPages = 10, apiPath, mutateKey, extra, topLeft }: TableProps<T>) {
  const { mutate } = useSWRConfig();
  const { query, pathname, replace } = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(false);

  const { getRowModel, getHeaderGroups, getSelectedRowModel, resetRowSelection } = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    debugTable: isDev,
  });

  const selectedIds = () => {
    // @ts-ignore
    const selectedRows = getSelectedRowModel().flatRows.map(({ original }) => ({ id: original.id }));
    return pluck('id', selectedRows);
  };

  const THead = () => (
    <thead className="bg-primary-50 relative rounded-t-full">
      {getHeaderGroups().map(({ id, headers }) => (
        <tr key={id}>
          {headers.map(({ id, colSpan, isPlaceholder, column: { getCanSort, getToggleSortingHandler, getIsSorted, columnDef }, getContext }) => (
            <th
              {...{
                className: clsx('truncate !border-blue-300 text-sm font-normal text-blue-500', getCanSort() && 'cursor-pointer select-none'),
                onClick: getToggleSortingHandler(),
                colSpan,
              }}
              key={id}
            >
              {!isPlaceholder && (
                <div className="flex items-center">
                  {flexRender(columnDef.header, getContext())}
                  {isNilOrEmpty(sorting) && getCanSort() && <HiChevronUpDown className="text-primary-500 inline" size={20} />}
                  {{
                    asc: <FiChevronsUp className="text-primary-500 inline" size={20} />,
                    desc: <FiChevronsDown className="text-primary-500 inline" size={20} />,
                  }[getIsSorted() as string] ?? null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  const TBody = () => (
    <tbody>
      {getRowModel().rows.map(({ id, getVisibleCells }) => (
        <tr key={id}>
          {getVisibleCells().map(({ id, column: { getSize, columnDef }, getContext }) => (
            <td className="!border-gray-200" key={id} style={{ width: getSize() }}>
              {flexRender(columnDef.cell, getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  const Top = () => {
    if (!topLeft && columns?.[0]?.id !== 'select') return null;

    return (
      <div className="border-primary-300 flex items-center justify-between border-b p-4">
        <div>
          {topLeft}
          {columns?.[0]?.id === 'select' && (
            <DeleteButton
              disabled={selectedIds()?.length === 0}
              onClick={() => {
                http.delete(apiPath || pathname, { data: selectedIds() }).then(() => {
                  toast.success('Items deleted');
                  mutate(mutateKey).then(() => resetRowSelection(true));
                });
              }}
              size="xs"
              position="right"
            >
              Delete
            </DeleteButton>
          )}
        </div>
        <div className="flex items-center space-x-2">{extra}</div>
      </div>
    );
  };

  const Footer = () => {
    if (isNilOrEmpty(data) || totalPages === 0) return null;

    return (
      <div className="flex justify-between border-t border-gray-200 p-4">
        <div>
          {totalPages > 1 && (
            <Pagination
              size="sm"
              defaultValue={Number(query?.page) || 1}
              onChange={(page) => replace({ query: { ...query, page } })}
              total={totalPages}
              radius="xl"
            />
          )}
        </div>
        <Select
          className="w-28"
          size="sm"
          defaultValue={query?.size?.toString() || '25'}
          onChange={(value) => replace({ query: { ...omit(['page'], query), size: value } })}
          data={[
            { label: 'Show 15', value: '15' },
            { label: 'Show 25', value: '25' },
            { label: 'Show 50', value: '50' },
            { label: 'Show 75', value: '75' },
            { label: 'Show 100', value: '100' },
          ]}
        />
      </div>
    );
  };

  if (isNilOrEmpty(data)) {
    return (
      <div className="rounded bg-white shadow">
        <Top />
        <MTable horizontalSpacing="md" verticalSpacing="md">
          <THead />
        </MTable>
        <div className="py-16 text-center text-xl ">
          <FiInfo className="mr-1 inline-block" />
          Not found
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded bg-white shadow">
      <Top />
      <MTable horizontalSpacing="md" verticalSpacing="md" highlightOnHover>
        <THead />
        <TBody />
      </MTable>
      <Footer />
    </div>
  );
}

type TableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  page?: number;
  totalPages?: number;
  apiPath?: string;
  mutateKey?: string;
  extra?: ReactNode;
  topLeft?: ReactNode;
};
