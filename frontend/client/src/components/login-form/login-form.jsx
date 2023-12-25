import React, { useState, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import { useAuth } from '../../contexts/auth';

import './login-form.scss';

export default function () {
  const history = useHistory();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const result = await signIn(formData.current);
      if (!result.isOk) {
        setLoading(false);
        notify(result.message, 'error', 2000);
      }
    },
    [signIn],
  );

  const onCreateAccountClick = useCallback(() => {
    history.push('/create-account');
  }, [history]);

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField="username"
          editorType="dxTextBox"
          editorOptions={usernameEditorOptions}
        >
          <RequiredRule message="User is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField="password"
          editorType="dxTextBox"
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField="rememberMe"
          editorType="dxCheckBox"
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width="100%"
            type="default"
            useSubmitBehavior
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width="24px" height="24px" visible />
              ) : (
							  'Sign In'
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className="link">
            <Link to="/reset-password">Forgot password?</Link>
          </div>
        </Item>
        <ButtonItem>
          <ButtonOptions
            text="Create an account"
            width="100%"
            onClick={onCreateAccountClick}
          />
        </ButtonItem>
      </Form>
    </form>
  );
}

const usernameEditorOptions = { stylingMode: 'filled', placeholder: 'User' };

const passwordEditorOptions = {
  stylingMode: 'filled',
  placeholder: 'Password',
  mode: 'password',
};
const rememberMeEditorOptions = {
  text: 'Remember me',
  elementAttr: { class: 'form-text' },
};
