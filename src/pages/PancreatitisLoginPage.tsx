import { FC, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { setPancreatitisApiToken } from "../api";
import {
  PANCREATITIS_TOKEN_KEY,
  loginPancreatitisUser,
  pancreatitisErrorText,
  registerPancreatitisUser,
} from "../modules/pancreatitisAuthApi";
import { ROUTES } from "../pancreatitisRoutes";
import { setPancreatitisUser } from "../slices/pancreatitisUserSlice";
import { useAppDispatch, useAppSelector } from "../store";

const PancreatitisLoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.pancreatitisUser.isAuthenticated);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to={ROUTES.GRID} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      if (isRegister) {
        await registerPancreatitisUser(login, password);
      }
      const token = await loginPancreatitisUser(login, password);
      localStorage.setItem(PANCREATITIS_TOKEN_KEY, token);
      setPancreatitisApiToken(token);
      dispatch(setPancreatitisUser({ login, token }));
      navigate(ROUTES.GRID);
    } catch (err) {
      setError(pancreatitisErrorText(err, isRegister ? "Не удалось зарегистрироваться" : "Неверный логин или пароль"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="login-page" className="page active">
      <h2 className="page-title">{isRegister ? "Регистрация" : "Вход"}</h2>

      <Form onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <Form.Group bsPrefix="form-group">
          <Form.Label bsPrefix="form-label">Логин</Form.Label>
          <Form.Control
            bsPrefix="form-input"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group bsPrefix="form-group">
          <Form.Label bsPrefix="form-label">Пароль</Form.Label>
          <Form.Control
            bsPrefix="form-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" bsPrefix="submit-btn" variant="" disabled={sending}>
          {sending ? "Подождите..." : isRegister ? "Зарегистрироваться" : "Войти"}
        </Button>

        <Button
          type="button"
          bsPrefix="submit-btn"
          variant=""
          className="submit-btn-outline"
          disabled={sending}
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
        >
          {isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
        </Button>
      </Form>
    </div>
  );
};

export default PancreatitisLoginPage;
