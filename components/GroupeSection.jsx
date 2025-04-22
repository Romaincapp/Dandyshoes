import React from 'react';
import './GroupeSection.css';

const membres = [
  {
    nom: "Allan",
    role: "Voix et guitare",
    photo: "/images/allan.jpg"
  },
  {
    nom: "Antoine",
    role: "Basse",
    photo: "/images/antoine.jpg"
  },
  {
    nom: "Arnaud",
    role: "Guitare",
    photo: "/images/arnaud.jpg"
  },
  {
    nom: "Romain",
    role: "Batterie",
    photo: "/images/romain.jpg"
  }
];

export default function GroupeSection() {
  return (
    <section className="groupe-section">
      <h2>Le Groupe</h2>
      <div className="groupe-grid">
        {membres.map((membre, idx) => (
          <div className="groupe-card" key={idx}>
            <img src={membre.photo} alt={membre.nom} className="groupe-photo" />
            <div className="groupe-nom">{membre.nom}</div>
            <div className="groupe-role">{membre.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
