function Table({ columns, rows, getRowKey = (row) => row.id }) {
  return (
    <>
      {/* Desktop*/}
      <div className="hidden overflow-x-auto rounded-md border border-border bg-surface lg:block">
        <div className="relative w-full">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="border-b border-border px-4 py-3 text-left text-sm font-bold tracking-wider whitespace-nowrap text-primary uppercase"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="relative border-b border-border transition-colors last:border-0 hover:bg-surface-2"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 align-middle text-sm whitespace-nowrap text-text"
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile, tablet*/}
      <div className="flex flex-col gap-3 lg:hidden">
        {rows.map((row) => (
          <div
            key={getRowKey(row)}
            className="rounded-md border border-border bg-surface p-4"
          >
            {columns.map((col, i) => (
              <div
                key={col.key}
                className="flex items-start justify-between border-b border-border py-2 text-sm last:border-0"
              >
                <span className="shrink-0 text-sm font-medium text-text-muted">
                  {col.label}
                </span>
                <span className="ml-2 text-right text-text">
                  {col.render(row)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Table;
