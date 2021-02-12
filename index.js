/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
const buildSection = text => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text,
  },
});

const buildAction = () => ({
  type: 'actions',
  block_id: 'dropdown1',
  elements: [],
});

const buildHeader = text => ({
  type: 'header',
  text: {
    type: 'plain_text',
    text,
  },
});

const buildSubmit = () => ({
  type: 'button',
  text: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true,
  },
  value: 'submit',
  action_id: 'button-action',
});

const buildInput = (labelText, placeHolderText, multiline = false) => ({
  type: 'input',
  label: {
    type: 'plain_text',
    text: labelText,
  },
  element: {
    type: 'plain_text_input',
    action_id: 'input1',
    placeholder: {
      type: 'plain_text',
      text: placeHolderText,
    },
    multiline,
  },
  optional: false,
});

const buildDivider = () => ({
  type: 'divider',
});

const buildBlock = question => {
  console.log(question);
  let main;
  switch (question.questionType) {
    case 'dropDownSingle':
      const dropDownSingle = {
        type: 'static_select',
        placeholder: {
          type: 'plain_text',
          text: question.placeholder,
        },
        action_id: 'select1',
        options: question.answerOptionsArr.map(item => ({
          text: {
            type: 'plain_text',
            text: item,
          },
          value: item,
        })),
      };
      main = buildSection();
      main.text.text = question.questionText;
      main.accessory = dropDownSingle;
      break;
    case 'dropDownMulti':
      const dropDownMulti = {
        type: 'multi_static_select',
        placeholder: {
          type: 'plain_text',
          text: 'Click Here!',
          emoji: true,
        },
        options: question.answerOptionsArr.map(item => ({
          text: {
            type: 'plain_text',
            text: item,
            emoji: true,
          },
          value: item,
        })),
        action_id: 'static_select-action',
      };
      main = buildSection();
      main.text.text = question.questionText;
      main.accessory = dropDownMulti;
      break;
    case 'shortAnswer':
      const shortAnswer = buildInput(
        question.questionText,
        question.placeholder
      );
      main = shortAnswer;
      break;
    // case 'dateSelect':
    //   baseMessage.elements.unshift(messageText);
    //   return baseMessage;
    default:
      break;
  }
  console.log('main', main);
  if (main) {
    return main;
  }
};

const buildModal = title => ({
  type: 'modal',
  title: {
    type: 'plain_text',
    text: title,
  },
  blocks: [],
  close: {
    type: 'plain_text',
    text: 'Cancel',
  },
  submit: {
    type: 'plain_text',
    text: 'Save',
  },
  private_metadata: 'Shhhhhhhh',
  callback_id: 'view_identifier_12',
});

module.exports = {
  buildInput,
  buildSection,
  buildAction,
  buildHeader,
  buildSubmit,
  buildBlock,
  buildModal,
  buildDivider,
};
