module.exports=[99930,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(50944),e=a.i(95245),f=a.i(19032),g=a.i(75716);let h=g.default.button.withConfig({displayName:"AddUserModal.styles__StyledAddButton",componentId:"sc-8187f4ed-0"})`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`,i=g.default.div.withConfig({displayName:"AddUserModal.styles__StyledModalOverlay",componentId:"sc-8187f4ed-1"})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,j=g.default.div.withConfig({displayName:"AddUserModal.styles__StyledModalContent",componentId:"sc-8187f4ed-2"})`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`,k=g.default.h2.withConfig({displayName:"AddUserModal.styles__StyledModalHeader",componentId:"sc-8187f4ed-3"})`
  margin-top: 0;
  margin-bottom: 20px;
`,l=g.default.div.withConfig({displayName:"AddUserModal.styles__StyledErrorContainer",componentId:"sc-8187f4ed-4"})`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
`,m=g.default.div.withConfig({displayName:"AddUserModal.styles__StyledFieldContainer",componentId:"sc-8187f4ed-5"})`
  margin-bottom: ${a=>a.marginBottom||"15px"};
`,n=g.default.label.withConfig({displayName:"AddUserModal.styles__StyledLabel",componentId:"sc-8187f4ed-6"})`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`,o=g.default.input.withConfig({displayName:"AddUserModal.styles__StyledInput",componentId:"sc-8187f4ed-7"})`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${a=>a.hasError?"#e74c3c":"#ccc"};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${a=>a.hasError?"#e74c3c":"#007bff"};
  }
`,p=g.default.span.withConfig({displayName:"AddUserModal.styles__StyledErrorText",componentId:"sc-8187f4ed-8"})`
  color: #e74c3c;
  font-size: 14px;
`,q=g.default.div.withConfig({displayName:"AddUserModal.styles__StyledButtonContainer",componentId:"sc-8187f4ed-9"})`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`,r=g.default.button.withConfig({displayName:"AddUserModal.styles__StyledCancelButton",componentId:"sc-8187f4ed-10"})`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${a=>a.isLoading?"not-allowed":"pointer"};

  &:hover {
    background-color: ${a=>a.isLoading?"#6c757d":"#5a6268"};
  }
`,s=g.default.button.withConfig({displayName:"AddUserModal.styles__StyledSubmitButton",componentId:"sc-8187f4ed-11"})`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${a=>a.isValid&&!a.isLoading?"#4CAF50":"#ccc"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${a=>a.isValid&&!a.isLoading?"pointer":"not-allowed"};

  &:hover {
    background-color: ${a=>a.isValid&&!a.isLoading?"#45a049":a.isValid&&!a.isLoading?"#4CAF50":"#ccc"};
  }
`,t=({onAddUser:a})=>{let[d,g]=(0,c.useState)(!1),[t,u]=(0,c.useState)(!1),[v,w]=(0,c.useState)(""),{register:x,handleSubmit:y,reset:z,formState:{errors:A,isValid:B}}=(0,e.useForm)({mode:"onChange"}),C=async b=>{u(!0),w("");try{let c=await fetch((0,f.apiUrl)("/api/users"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});if(!c.ok)throw Error(`Error: ${c.status}`);let d=await c.json(),e=d.data||d;a(e),z(),g(!1)}catch(a){w(a instanceof Error?a.message:"Error creating user")}finally{u(!1)}};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{onClick:()=>g(!0),children:"+ Add User"}),d&&(0,b.jsx)(i,{children:(0,b.jsxs)(j,{children:[(0,b.jsx)(k,{children:"Add New User"}),v&&(0,b.jsx)(l,{children:v}),(0,b.jsxs)("form",{onSubmit:y(C),children:[(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:"Name:"}),(0,b.jsx)(o,{type:"text",hasError:!!A.name,...x("name",{required:"Name is required",minLength:{value:2,message:"Name must be at least 2 characters"}}),placeholder:"Enter name"}),A.name&&(0,b.jsx)(p,{children:A.name.message})]}),(0,b.jsxs)(m,{marginBottom:"20px",children:[(0,b.jsx)(n,{children:"Email:"}),(0,b.jsx)(o,{type:"email",hasError:!!A.email,...x("email",{required:"Email is required",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email"}}),placeholder:"Enter email"}),A.email&&(0,b.jsx)(p,{children:A.email.message})]}),(0,b.jsxs)(q,{children:[(0,b.jsx)(r,{type:"button",onClick:()=>{g(!1),w(""),z()},disabled:t,isLoading:t,children:"Cancelar"}),(0,b.jsx)(s,{type:"submit",disabled:!B||t,isValid:B,isLoading:t,children:t?"Creando...":"Agregar"})]})]})]})})]})},u=g.default.div.withConfig({displayName:"UserList.styles__StyledContainer",componentId:"sc-796119a2-0"})`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`,v=g.default.h1.withConfig({displayName:"UserList.styles__StyledHeader",componentId:"sc-796119a2-1"})`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`,w=g.default.div.withConfig({displayName:"UserList.styles__StyledButtonContainer",componentId:"sc-796119a2-2"})`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,x=g.default.button.withConfig({displayName:"UserList.styles__StyledBackButton",componentId:"sc-796119a2-3"})`
  padding: 10px 20px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`,y=g.default.table.withConfig({displayName:"UserList.styles__StyledUserTable",componentId:"sc-796119a2-4"})`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`,z=g.default.th.withConfig({displayName:"UserList.styles__StyledTableHeader",componentId:"sc-796119a2-5"})`
  padding: 15px;
  text-align: left;
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`,A=g.default.tr.withConfig({displayName:"UserList.styles__StyledTableRow",componentId:"sc-796119a2-6"})`
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.01);
  }
`,B=g.default.td.withConfig({displayName:"UserList.styles__StyledTableCell",componentId:"sc-796119a2-7"})`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`,C=g.default.div.withConfig({displayName:"UserList.styles__StyledMessage",componentId:"sc-796119a2-8"})`
  padding: 40px;
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`,D=g.default.div.withConfig({displayName:"UserList.styles__StyledPaginationContainer",componentId:"sc-796119a2-9"})`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`,E=g.default.button.withConfig({displayName:"UserList.styles__StyledPaginationButton",componentId:"sc-796119a2-10"})`
  padding: 10px 20px;
  background: ${a=>a.disabled?"rgba(255, 255, 255, 0.3)":"linear-gradient(45deg, #4facfe, #00f2fe)"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${a=>a.disabled?"not-allowed":"pointer"};
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: ${a=>a.disabled?"none":"translateY(-2px)"};
    box-shadow: ${a=>a.disabled?"none":"0 6px 20px rgba(0, 0, 0, 0.3)"};
  }
`,F=g.default.span.withConfig({displayName:"UserList.styles__StyledPaginationInfo",componentId:"sc-796119a2-11"})`
  margin: 0 15px;
  font-weight: bold;
  color: #fff;
`;a.s(["default",0,()=>{let a=(0,d.useRouter)(),[e,g]=(0,c.useState)([]),[h,i]=(0,c.useState)(!0),[j,k]=(0,c.useState)({totalPages:0,totalUsers:0,currentPage:1,hasNextPage:!1,hasPrevPage:!1});(0,c.useEffect)(()=>{l(1)},[]);let l=async a=>{try{i(!0);let b=await fetch((0,f.apiUrl)(`/api/users?page=${a}&limit=5`));if(!b.ok)throw Error(`HTTP error! status: ${b.status}`);let c=await b.json();g(c.data.users||[]),c.data.pagination&&k(c.data.pagination)}catch(a){console.error("❌ Error loading users:",a),g([])}finally{i(!1)}},{currentPage:m,totalPages:n,totalUsers:o,hasNextPage:p,hasPrevPage:q}=j;return(0,b.jsxs)(u,{children:[(0,b.jsx)(v,{children:"User List"}),(0,b.jsxs)(w,{children:[(0,b.jsx)(x,{onClick:()=>a.push("/"),children:"← Back to Home"}),(0,b.jsx)(t,{onAddUser:()=>{k(a=>({...a,currentPage:1})),l(1)}})]}),h?(0,b.jsx)(C,{children:"Loading users..."}):0===e.length?(0,b.jsx)(C,{children:"No users found."}):(0,b.jsxs)(y,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(z,{children:"ID"}),(0,b.jsx)(z,{children:"Name"}),(0,b.jsx)(z,{children:"Email"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)(A,{children:[(0,b.jsx)(B,{children:a.id}),(0,b.jsx)(B,{children:a.name}),(0,b.jsx)(B,{children:a.email})]},a.id))})]}),(0,b.jsxs)(D,{children:[(0,b.jsx)(E,{disabled:!q,onClick:()=>l(m-1),children:"← Previous"}),(0,b.jsxs)(F,{children:["Page ",m," of ",n," | Showing ",e.length,"/",o," users"]}),(0,b.jsx)(E,{disabled:!p,onClick:()=>l(m+1),children:"Next →"})]})]})}],99930)}];

//# sourceMappingURL=src_features_UserList_UserList_tsx_0j51.mp._.js.map