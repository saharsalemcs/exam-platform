/**
 * DataTable — كومبوننت عام لأي جدول بيانات (Desktop table + Mobile
 * cards)، الأعمدة نفسها بتيجي من برّه عن طريق `columns`.
 *
 * كل عمود:
 *   {
 *     key:    string          — مفتاح فريد (مش لازم يطابق اسم عمود
 *                                فعلي في البيانات)
 *     label:  string          — النص في header الجدول / label الكارد
 *     render: (row) => node   — بيرجع المحتوى اللي هيتعرض في الخلية
 *   }
 *
 * الاستخدام:
 *   <DataTable columns={studentHistoryColumns} rows={exams} />
 *
 * ملحوظة: الأعمدة نفسها (المنطق، الألوان، الروابط) بتتعرّف في ملف
 * "columns" منفصل لكل صفحة (زي studentHistoryColumns.jsx)، مش هنا.
 * الملف ده مسؤول بس عن الـ layout والـ responsive switch.
 */
function Table({ columns, rows, getRowKey = (row) => row.id }) {
  return (
    <>
      {/* Desktop: من sm فأكبر */}
      <div
        className="hidden overflow-x-auto rounded-md sm:block"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-lg py-md text-sm font-bold tracking-wider whitespace-nowrap uppercase"
                  style={{ color: "var(--color-primary)" }}
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
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-lg py-md whitespace-nowrap">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: أصغر من sm */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map((row) => (
          <div
            key={getRowKey(row)}
            className="rounded-md px-lg"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {columns.map((col, i) => (
              <div
                key={col.key}
                className="flex items-center justify-between py-2.5"
                style={{
                  borderBottom:
                    i === columns.length - 1
                      ? "none"
                      : "1px solid var(--color-border)",
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {col.label}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
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
