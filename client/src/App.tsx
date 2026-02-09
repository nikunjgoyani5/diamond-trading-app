import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { Provider } from "react-redux";
import store from "@/store";

import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const App = () => (
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ScrollToTop />
      <Toaster />
      <Sonner />
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
  </Provider>
);

export default App;
