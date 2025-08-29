import DinosaurCard from "./DinosaurCard";
import trexImage from "@/assets/trex-portrait.jpg";
import triceratopsImage from "@/assets/triceratops-portrait.jpg";
import velociraptorImage from "@/assets/velociraptor-portrait.jpg";
import { Skull, BookOpen } from "lucide-react";

const Encyclopedia = () => {
  const dinosaurs = [
    {
      name: "Tyrannosaure Rex",
      scientificName: "Tyrannosaurus rex",
      image: trexImage,
      period: "Crétacé supérieur",
      length: "12-13 mètres",
      weight: "6-9 tonnes",
      habitat: "Forêts et plaines",
      diet: "Carnivore",
      description: "Le roi des dinosaures prédateurs. Avec ses dents longues comme des bananes et sa mâchoire puissante, le T-Rex était un chasseur redoutable qui dominait son écosystème il y a 68 millions d'années."
    },
    {
      name: "Tricératops",
      scientificName: "Triceratops horridus",
      image: triceratopsImage,
      period: "Crétacé supérieur",
      length: "8-9 mètres",
      weight: "6-12 tonnes",
      habitat: "Plaines herbacées",
      diet: "Herbivore",
      description: "Reconnaissable par ses trois cornes impressionnantes et sa grande collerette osseuse, le Tricératops était un herbivore massif qui se défendait efficacement contre les prédateurs."
    },
    {
      name: "Vélociraptor",
      scientificName: "Velociraptor mongoliensis",
      image: velociraptorImage,
      period: "Crétacé supérieur",
      length: "2 mètres",
      weight: "15-20 kg",
      habitat: "Déserts et steppes",
      diet: "Carnivore",
      description: "Petit mais redoutable, le Vélociraptor était un chasseur intelligent doté d'une griffe falciforme mortelle. Il chassait probablement en groupe et possédait des plumes."
    }
  ];

  return (
    <section id="encyclopedie" className="py-20 bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Skull className="h-8 w-8 text-accent mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Encyclopédie Préhistorique
            </h2>
            <BookOpen className="h-8 w-8 text-accent ml-3" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les créatures extraordinaires qui ont peuplé notre planète il y a des millions d'années. 
            Chaque dinosaure raconte une histoire unique d'évolution et d'adaptation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {dinosaurs.map((dinosaur, index) => (
            <DinosaurCard key={index} {...dinosaur} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Et bien d'autres espèces à découvrir...
          </p>
          <div className="inline-flex items-center space-x-2 text-accent">
            <Skull className="h-5 w-5" />
            <span className="font-medium">Plus de 1000 espèces documentées</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Encyclopedia;