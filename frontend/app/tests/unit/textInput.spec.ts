import textInput from '@/components/Elements/TextInput.vue';
import { shallowMount } from '@vue/test-utils';

interface ITextInputProps {
  value: string;
  labelText?: string;
  placeholderText?: string;
  inputType?: string;
  disabled?: boolean;
}

// @Prop({ type: String, required: true })
// value: string;
//
// @Prop({ type: String, required: false })
// placeholderText: string;
//
// @Prop({ type: String, default: 'text' })
// inputType: string;
//
// @Prop({ type: Boolean, default: false })
// disabled: boolean;

describe('textInput component', () => {
  let wrapper: any;

  const createComponent = (props: ITextInputProps) => {
    wrapper = shallowMount(textInput, {
      propsData: props,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('label transfer check', () => {
    createComponent({
      labelText: 'LabelText',
      value: 'testValue',
    });
    expect(wrapper.text()).toContain('LabelText');
  });

  it('check disabled button', () => {
    createComponent({
      disabled: true,
      value: 'testValue',
    });
    const button = wrapper.find('[data-test="input"]');
    expect(button.attributes().disabled).toEqual('disabled');
  });

  // it('renders textInput correctly', () => {
  //   expect(wrapper.element).toMatchSnapshot()
  // })

  // it('placeholder text transfer check', () => {
  //   createComponent({
  //     placeholderText: 'placeholderText',
  //     value: 'testValue'
  //   });
  //   expect(wrapper.text()).toContain('placeholderText');
  // });
});
