import textInput from '@/components/Elements/TextInput.vue';
import { shallowMount } from "@vue/test-utils";

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

interface ITextInputProps {
  value: string;
  labelText?: string;
  placeholderText?: string;
  inputType?: string;
  disabled?: boolean;
}

describe('textInput component', () => {
  let wrapper: any;

  const createComponent = (props: ITextInputProps) => {
    wrapper = shallowMount(textInput, {
      propsData: props,
    });
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('label transfer check', () => {
    createComponent({
      labelText: 'LabelText',
      value: 'testValue'
    });
    expect(wrapper.text()).toContain('LabelText');
  });

  // it('placeholder text transfer check', () => {
  //   createComponent({
  //     placeholderText: 'placeholderText',
  //     value: 'testValue'
  //   });
  //   expect(wrapper.text()).toContain('placeholderText');
  // });
});
