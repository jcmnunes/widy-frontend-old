import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { Welcome } from '@storybook/react/demo';

import { Button, ButtonReadme } from '..';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Miscellaneous components', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ButtonReadme))
  .add('Button', () => {
    let label, options, defaultValue;

    label = 'intent';
    options = {
      primary: 'primary',
      secondary: null,
      success: 'success',
      warning: 'warning',
      error: 'error',
    };
    defaultValue = null;
    const intent = select(label, options, defaultValue);

    label = 'size';
    options = {
      medium: null,
      large: 'large',
    };
    defaultValue = null;
    const size = select(label, options, defaultValue);

    label = 'type';
    options = {
      submit: 'submit',
      button: 'button',
    };
    defaultValue = 'button';
    const type = select(label, options, defaultValue);

    label = 'text';
    defaultValue = 'Action';
    const buttonText = text(label, defaultValue);

    label = 'loading';
    defaultValue = false;
    const loading = boolean(label, defaultValue);

    label = 'disabled';
    defaultValue = false;
    const disabled = boolean(label, defaultValue);

    return (
      <Button intent={intent} size={size} type={type} loading={loading} disabled={disabled}>
        {buttonText}
      </Button>
    );
  });