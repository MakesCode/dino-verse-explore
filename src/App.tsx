import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import GliPage from "./pages/Gli";
import { Provider as DIPresenterProvider } from "./lib/depencyInversion/Provider";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DIPresenterProvider>
            <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gli" element={<GliPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </SidebarProvider>
        </DIPresenterProvider>
      </BrowserRouter>
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
