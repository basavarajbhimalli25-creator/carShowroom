import { useState } from "react";
import { UserRound, Mail, BriefcaseBusiness } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Showroom Administrator",
    email: "admin@autoelite.example",
    role: "Showroom Manager",
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setEditing(false);
    setSaved(true);
  }

  return (
    <section className="container page-section profile-section">
      <div className="section-heading">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>Profile Settings</h1>
        <p>View and edit the local administrator profile.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <UserRound size={44} />
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              required
            />

            <input
              value={profile.role}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
              required
            />

            <button className="btn btn-primary" type="submit">
              Save Profile
            </button>
          </form>
        ) : (
          <>
            <h2>{profile.name}</h2>

            <p>
              <Mail size={17} /> {profile.email}
            </p>

            <p>
              <BriefcaseBusiness size={17} /> {profile.role}
            </p>

            {saved && (
              <p className="success-message">
                Profile updated successfully.
              </p>
            )}

            <button
              className="btn btn-primary"
              onClick={() => {
                setEditing(true);
                setSaved(false);
              }}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </section>
  );
}