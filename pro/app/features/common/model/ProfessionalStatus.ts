export enum ProfessionalStatus {
  /// <summary> Titulaire du public </summary>
  PublicTitulaire = 0,
  /// <summary>CDI Public</summary>
  // ReSharper disable once InconsistentNaming
  PublicCDI = 1,
  /// <summary>CDD Public</summary>
  // ReSharper disable once InconsistentNaming
  PublicCDD = 2,
  /// <summary> Militaire</summary>
  PublicMilitaire = 3,
  /// <summary>CDI privé</summary>
  // ReSharper disable once InconsistentNaming
  PrivateCDI = 4,
  /// <summary>CDD privé</summary>
  // ReSharper disable once InconsistentNaming
  PrivateCDD = 5,
  /// <summary>Intérimaire</summary>
  PrivateInterim = 6,
  /// <summary>Intermittent</summary>
  PrivateIntermittent = 7,
  /// <summary>Artisan / Commerçant</summary>
  IndepArtisant = 8,
  /// <summary>Auto-entrepreneur</summary>
  IndepAuto = 9,
  /// <summary>Profession libéral</summary>
  IndepLiberal = 10,
  /// <summary>Chef d'entreprise</summary>
  IndepChef = 11,
  /// <summary>Etudiant</summary>
  OtherEtudiant = 12,
  /// <summary>Alternant</summary>
  OtherEtudiantAlternant = 13, // same as PrivateCDD
  /// <summary>Retraité</summary>
  OtherRetaite = 14,
  /// <summary>Recherche d'emploi</summary>
  OtherRecherche = 15,
  /// <summary>Etudiant eligible offre residence</summary>
  OtherResidenceEtudiant = 16,
  /// <summary>Etudiant Alternant eligible offre residence</summary>
  OtherResidenceAlternant = 17,
  //   /// <summary>Autre situation (AAH, rentes, allocations)</summary>
  OtherAllowance = 18,
}
