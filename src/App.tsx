import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import KnowledgeNodePage from "./pages/KnowledgeNodePage";
import BreakerGuide from "./pages/BreakerGuide";
import WizardPage from "./pages/WizardPage";
import AutoWizardPage from "./pages/AutoWizardPage";
import MowerWizardPage from "./pages/MowerWizardPage";
import MotoWizardPage from "./pages/MotoWizardPage";
import DiagnosisHistoryPage from "./pages/DiagnosisHistoryPage";
import WizardHub from "./pages/WizardHub";
import InstallBanner from "./components/InstallBanner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/category/:slug/:nodeId" component={KnowledgeNodePage} />
      <Route path="/breaker-guide" component={BreakerGuide} />
      <Route path="/wizards" component={WizardHub} />
      <Route path="/wizard" component={WizardPage} />
      <Route path="/wizard/automotive" component={AutoWizardPage} />
      <Route path="/wizard/lawn-garden" component={MowerWizardPage} />
      <Route path="/wizard/motorcycle" component={MotoWizardPage} />
      <Route path="/my-diagnoses" component={DiagnosisHistoryPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <InstallBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
