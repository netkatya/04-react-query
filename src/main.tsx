import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "modern-normalize";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster position="top-right" />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);