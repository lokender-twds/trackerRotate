import { useEffect, useState } from "react";
import { API_BASE } from "../api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/links`)
      .then(res => res.json())
      .then(setLinks);
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">Tracking Links</h4>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Slug</th>
                <th>Public URL</th>
                <th>Offer</th>
                <th>Affiliate ID</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => (
                <tr key={link._id}>
                  <td>{link.slug}</td>
                  <td>
                    <code>
                      https://trk.yoursite.com/{link.slug}?iclid=
                      {"{gclid}"}
                    </code>
                  </td>
                  <td>{link.offerUrl}</td>
                  <td>{link.affiliateId}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {links.length === 0 && (
            <div className="text-muted text-center">
              No links created yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
