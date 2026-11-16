import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import {
  MAX_THRESHOLD_MOCK,
  filterPancreatitisSignsMock,
  getPancreatitisFeedMock,
} from "../modules/pancreatitisMock";
import { PancreatitisSign, toPancreatitisSign } from "../modules/pancreatitisTypes";
import type { RootState } from "../store";
import { resetPancreatitisUser } from "./pancreatitisUserSlice";

interface PancreatitisSignsState {
  maxValue: number;
  signs: PancreatitisSign[];
  feedSign: PancreatitisSign | null;
  draft: PancreatitisSign | null;
  loading: boolean;
  fromMock: boolean;
  error: string | null;
}

const initialState: PancreatitisSignsState = {
  maxValue: MAX_THRESHOLD_MOCK,
  signs: [],
  feedSign: null,
  draft: null,
  loading: false,
  fromMock: false,
  error: null,
};

type ThunkConfig = { state: RootState; rejectValue: string };

export const getPancreatitisSignsList = createAsyncThunk<
  { signs: PancreatitisSign[]; fromMock: boolean },
  void,
  ThunkConfig
>("pancreatitisSigns/getPancreatitisSignsList", async (_, { getState, rejectWithValue }) => {
  const { pancreatitisSigns, pancreatitisUser } = getState();
  try {
    const { data } = await api.pancreatitisSigns.pancreatitisSignsList({
      max_value: pancreatitisSigns.maxValue,
    });
    return { signs: (data.data ?? []).map(toPancreatitisSign), fromMock: false };
  } catch {
    if (!pancreatitisUser.isAuthenticated) {
      return { signs: filterPancreatitisSignsMock(pancreatitisSigns.maxValue), fromMock: true };
    }
    return rejectWithValue("Не удалось загрузить критерии");
  }
});

export const getPancreatitisSignFeed = createAsyncThunk<
  { sign: PancreatitisSign | null; fromMock: boolean },
  { id?: number; next?: boolean },
  ThunkConfig
>("pancreatitisSigns/getPancreatitisSignFeed", async ({ id, next }, { getState, rejectWithValue }) => {
  try {
    const { data } =
      id === undefined
        ? await api.pancreatitisSigns.feedList()
        : await api.pancreatitisSigns.feedDetail(id, next ? { next: true } : undefined);
    return { sign: data.data ? toPancreatitisSign(data.data) : null, fromMock: false };
  } catch {
    if (!getState().pancreatitisUser.isAuthenticated) {
      return { sign: getPancreatitisFeedMock(id, next), fromMock: true };
    }
    return rejectWithValue("Критерий не найден");
  }
});

export const getPancreatitisSignDraft = createAsyncThunk<PancreatitisSign | null, void, ThunkConfig>(
  "pancreatitisSigns/getPancreatitisSignDraft",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.pancreatitisSigns.draftList();
      return data.data ? toPancreatitisSign(data.data) : null;
    } catch {
      return rejectWithValue("Не удалось загрузить черновик");
    }
  }
);

export const createPancreatitisSignDraft = createAsyncThunk<
  PancreatitisSign,
  { title: string; image?: File; video?: File },
  ThunkConfig
>("pancreatitisSigns/createPancreatitisSignDraft", async (form, { rejectWithValue }) => {
  try {
    const { data } = await api.pancreatitisSigns.pancreatitisSignsCreate(form);
    return toPancreatitisSign(data.data ?? {});
  } catch {
    return rejectWithValue("Не удалось создать черновик");
  }
});

export const publishPancreatitisSign = createAsyncThunk<
  PancreatitisSign,
  { id: number; title: string; description: string; stage: string; threshold_value: number },
  ThunkConfig
>("pancreatitisSigns/publishPancreatitisSign", async ({ id, ...form }, { rejectWithValue }) => {
  try {
    const { data } = await api.pancreatitisSigns.publishUpdate(id, form);
    return toPancreatitisSign(data.data ?? {});
  } catch {
    return rejectWithValue("Не удалось опубликовать критерий");
  }
});

export const deletePancreatitisSign = createAsyncThunk<number, number, ThunkConfig>(
  "pancreatitisSigns/deletePancreatitisSign",
  async (id, { rejectWithValue }) => {
    try {
      await api.pancreatitisSigns.pancreatitisSignsDelete(id);
      return id;
    } catch {
      return rejectWithValue("Не удалось удалить критерий");
    }
  }
);

export const likePancreatitisSign = createAsyncThunk<
  { id: number; is_liked: number; likes_count: number },
  { id: number; like: boolean },
  ThunkConfig
>("pancreatitisSigns/likePancreatitisSign", async ({ id, like }, { rejectWithValue }) => {
  try {
    const { data } = await api.pancreatitisSigns.likeCreate(id, { like: like ? "1" : "0" });
    return {
      id,
      is_liked: data.data?.is_liked ?? (like ? 1 : 0),
      likes_count: data.data?.likes_count ?? 0,
    };
  } catch {
    return rejectWithValue("Не удалось поставить лайк");
  }
});

const pancreatitisSignsSlice = createSlice({
  name: "pancreatitisSigns",
  initialState,
  reducers: {
    setPancreatitisMaxValue(state, action: PayloadAction<number>) {
      state.maxValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPancreatitisSignsList.fulfilled, (state, action) => {
        state.signs = action.payload.signs;
        state.fromMock = action.payload.fromMock;
      })
      .addCase(getPancreatitisSignFeed.fulfilled, (state, action) => {
        state.feedSign = action.payload.sign;
        state.fromMock = action.payload.fromMock;
      })
      .addCase(getPancreatitisSignFeed.rejected, (state) => {
        state.feedSign = null;
      })
      .addCase(getPancreatitisSignDraft.fulfilled, (state, action) => {
        state.draft = action.payload;
      })
      .addCase(createPancreatitisSignDraft.fulfilled, (state, action) => {
        state.draft = action.payload;
      })
      .addCase(publishPancreatitisSign.fulfilled, (state, action) => {
        state.draft = null;
        state.feedSign = action.payload;
      })
      .addCase(deletePancreatitisSign.fulfilled, (state, action) => {
        state.signs = state.signs.filter((sign) => sign.id !== action.payload);
      })
      .addCase(likePancreatitisSign.fulfilled, (state, action) => {
        const { id, is_liked, likes_count } = action.payload;
        for (const sign of [state.feedSign, ...state.signs]) {
          if (sign && sign.id === id) {
            sign.is_liked = is_liked;
            sign.likes_count = likes_count;
          }
        }
      })
      .addCase(resetPancreatitisUser, () => initialState)
      .addMatcher(
        (action) => action.type.startsWith("pancreatitisSigns/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("pancreatitisSigns/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("pancreatitisSigns/") && action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Ошибка запроса";
        }
      );
  },
});

export const { setPancreatitisMaxValue } = pancreatitisSignsSlice.actions;
export default pancreatitisSignsSlice.reducer;
