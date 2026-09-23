import type { ReactNode } from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import { queryClient } from "./api";

interface Props {children: ReactNode}
const Providers = ({ children }: Props) => {
    return (
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>  
    );
};

export default Providers;