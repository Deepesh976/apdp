import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

type ProductEnquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  actionType: "enquire" | "pdf" | "brochure";
  productSlug?: string;
  productTitle?: string;
  createdAt: string;
};

export default function ProductEnquiries() {
  const [data, setData] = useState<ProductEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/product-enquiry/admin/all`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading product enquiries...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>📦 Product Enquiries</h1>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Date</th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Phone</th>
            <th style={th}>Action</th>
            <th style={th}>Product</th>
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e._id}>
              <td style={td}>
                {new Date(e.createdAt).toLocaleDateString()}
              </td>
              <td style={td}>{e.name}</td>
              <td style={td}>{e.email}</td>
              <td style={td}>{e.phone || "-"}</td>
              <td style={td}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    background:
                      e.actionType === "pdf"
                        ? "#e0f2fe"
                        : e.actionType === "brochure"
                        ? "#dcfce7"
                        : "#fef3c7",
                  }}
                >
                  {e.actionType.toUpperCase()}
                </span>
              </td>
              <td style={td}>{e.productTitle || e.productSlug || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
};

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: 8,
  background: "#f5f5f5",
  textAlign: "left",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: 8,
};
