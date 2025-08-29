import { Button } from "@/components/ui/button";
import dinoLogo from "@/assets/dino-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={dinoLogo} alt="DinoExplorer Logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-foreground">DinoExplorer</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#accueil" className="text-foreground hover:text-primary transition-colors">
            Accueil
          </a>
          <a href="#encyclopedie" className="text-foreground hover:text-primary transition-colors">
            Encyclopédie
          </a>
          <a href="#decouvrir" className="text-foreground hover:text-primary transition-colors">
            Découvrir
          </a>
          <Button variant="fossil" size="sm">
            Explorer
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;