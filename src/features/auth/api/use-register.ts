// import { useMutation } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";
// import { useRouter } from 'next/navigation'
// import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// import { client } from "@/lib/rpc";

// type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
// type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

// export const useRegister = () => {
//     const router = useRouter();
//     const queryClient = useQueryClient();

//     const mutation = useMutation<
//     ResponseType,
//     Error,
//     RequestType
// >({
//     mutationFn: async ({ json }) => {
//         const response = await client.api.auth.register["$post"]({ json });

//         if (!response.ok) {
//             throw new Error("Failed to register")
//         }
        

//         return await response.json();
//     },
//     onSuccess: () => {
//         toast.success("Registered");
//         router.refresh();
//         queryClient.invalidateQueries({ queryKey: ["current"] });
//     },
//     onError: () => {
//         toast.error("Failed to register");
//     }
// });

// return mutation;
// };
    

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from 'next/navigation';
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            // Extract email and determine the role
            let role = "student"; // Default role
            if (json.email.includes("@jaipur.manipal.edu")) {
                role = "faculty";
            }

            // Include the role in the request payload
            const userData = {
                ...json,  // Preserve existing fields
                role      // Add role dynamically
            };

            // Send data to the backend
            const response = await client.api.auth.register["$post"]({ json: userData });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const responseData = await response.json();
            console.log("Registered User Data:", responseData); // ✅ Debugging output

            return responseData;
        },
        onSuccess: () => {
            toast.success("Registered successfully");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
        },
        onError: () => {
            toast.error("Failed to register");
        }
    });

    return mutation;
};

