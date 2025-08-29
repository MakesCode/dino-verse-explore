import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Ruler, Weight, MapPin } from "lucide-react";

interface DinosaurCardProps {
  name: string;
  scientificName: string;
  image: string;
  period: string;
  length: string;
  weight: string;
  habitat: string;
  diet: string;
  description: string;
}

const DinosaurCard = ({ 
  name, 
  scientificName, 
  image, 
  period, 
  length, 
  weight, 
  habitat, 
  diet, 
  description 
}: DinosaurCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-accent/30">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground">{name}</CardTitle>
          <Badge variant={diet === 'Carnivore' ? 'destructive' : diet === 'Herbivore' ? 'secondary' : 'default'}>
            {diet}
          </Badge>
        </div>
        <CardDescription className="italic text-muted-foreground">
          {scientificName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{period}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Ruler className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{length}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Weight className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{weight}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{habitat}</span>
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          En Savoir Plus
        </Button>
      </CardContent>
    </Card>
  );
};

export default DinosaurCard;