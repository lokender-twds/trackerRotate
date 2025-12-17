import { useState } from "react";
import { API_BASE } from "../api";

export default function CreateLink() {
  const [form, setForm] = useState({
    slug: "",
    offerUrl: "",
    affiliateId: ""
  });

  const submit = async () => {
    await fetch(`${API_BASE}/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Link created successfully");
    setForm({ slug: "", offerUrl: "", affiliateId: "" });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">Create Tracking Link</h4>

          <div className="mb-3">
            <label className="form-label">Slug</label>
            <input
              className="form-control"
              placeholder="getyourbiobooster"
              value={form.slug}
              onChange={e =>
                setForm({ ...form, slug: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Offer URL</label>
            <input
              className="form-control"
              placeholder="https://getyourbiobooster.com/dtc3"
              value={form.offerUrl}
              onChange={e =>
                setForm({ ...form, offerUrl: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Affiliate ID</label>
            <input
              className="form-control"
              placeholder="6x5w3RZeFF"
              value={form.affiliateId}
              onChange={e =>
                setForm({ ...form, affiliateId: e.target.value })
              }
            />
          </div>

          <button className="btn btn-primary" onClick={submit}>
            Create Link
          </button>
        </div>
      </div>
    </div>
  );
}
