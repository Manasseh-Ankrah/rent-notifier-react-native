export const initialState = {
  adminToken: "",
  adminState: {},
  status: "",
  createdByState: "",
  tenantState: [],
  nightMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_ADMIN":
      return {
        ...state,
        adminToken: action.item.adminToken,
        adminState: action.item.adminState,
        status: action.item.status,
      };
    case "GET_TENANT_DATA":
      return {
        ...state,
        tenantState: action.item.tenantState,
      };
    case "GET_CREATEDBY_DATA":
      return {
        ...state,
        createdByState: action.item.createdByState,
      };
    case "GET_DARKMODE":
      return {
        ...state,
        nightMode: action.item.nightMode,
      };
    // case "GET_EVENT_DATA":
    //   return {
    //     ...state,
    //     eventState: action.item.eventState,
    //   };
    // case "GET_FEESETUP_DATA":
    //   return {
    //     ...state,
    //     feeSetupState: action.item.feeSetupState,
    //   };
    // case "GET_FEES_DATA":
    //   return {
    //     ...state,
    //     feeState: action.item.feeState,
    //   };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
