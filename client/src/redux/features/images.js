const initialState = {
  images: [],
  error: null,
  loading: false,
};

export default function images(state = initialState, action) {
  switch (action.type) {
    case "image/pending":
      return {
        ...state,
        loading: true,
      };
    case "image/fulfilled":
      return {
        ...state,
        images: [...state.images, action.payload],
        loading: false,
      };

    case "image/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "image/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "image/fetch/fulfilled":
      return { ...state, images: action.payload, loading: false };

    case "image/fetch/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const loadImage = () => {
  return async (dispatch) => {
    dispatch({ type: "image/fetch/pending" });
    try {
      const res = await fetch(`/images`);
      const data = await res.json();

      dispatch({ type: "image/fetch/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "image/fetch/rejected", payload: error });
    }
  };
};

export const uploadImage = (file) => {
  return async (dispatch) => {
    dispatch({ type: "image/pending" });
    try {
      const formData = new FormData();
      formData.append("img", file);
      const res = await fetch(`/images`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      dispatch({ type: "image/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "image/rejected", payload: error });
    }
  };
};
