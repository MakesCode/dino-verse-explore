import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import heroImage from "@/assets/hero-prehistoric.jpg";

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Explorez l'Ère des 
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Dinosaures
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Plongez dans le monde fascinant des créatures préhistoriques qui ont dominé 
            notre planète il y a des millions d'années. Découvrez leurs secrets, 
            leur évolution et leur héritage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              <Compass className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Commencer l'Exploration
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="fossil" size="lg">
              Encyclopédie Complète
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;