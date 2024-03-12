// import { Token } from "@/types";
// import { BASE_URL } from "./URL";
// import { getAuthHeaders } from "./utils";


// type createProjectParams = {
//   token: Token;
//   project_name: string;
//   project_period: string;
//   start_date: Date;
//   deadline_date?: Date;
//   project_status: string;
//   general_description: string;
//   technology_stack: string[];
// };

// const createProject = async (values: createProjectParams) => {
//   try {
//     const headers = getAuthHeaders(values.token);
//     const response = await fetch(
//       `${CREATE_PROJECT}`,
//       {
//         method: "DELETE",
//         headers: headers,
//         body: JSON.stringify(values)
//       }
//     );

//     if (!response.ok) {
//       const errMsg = await response.json();
//       if (errMsg.detail) throw new Error(errMsg.detail);
//       throw new Error(errMsg);
//     }
//     toast.success("You deleted a skill with success!!!");
//     return await response.json();
//   } catch (error) {
//     checkError(error);
//   }
// };
