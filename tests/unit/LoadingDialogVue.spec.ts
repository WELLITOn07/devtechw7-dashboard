import { mount } from '@vue/test-utils';
import LoadingDialog from '@/components/LoadingDialog.vue';

describe('LoadingDialog.vue', () => {
  it('renders when visible is true', () => {
    const wrapper = mount(LoadingDialog, {
      props: {
        visible: true,
        message: "Loading, please wait...",
      },
    });

    expect(wrapper.find('.loading-dialog').exists()).toBe(true);
    expect(wrapper.find('.dialog__message').text()).toBe('Loading, please wait...');
  });

  it('does not render when visible is false', () => {
    const wrapper = mount(LoadingDialog, {
      props: {
        visible: false,
        message: "Loading, please wait...",
      },
    });

    expect(wrapper.find('.loading-dialog').exists()).toBe(false);
  });

  it('displays the correct message when passed as a prop', () => {
    const customMessage = 'Fetching data...';
    const wrapper = mount(LoadingDialog, {
      props: {
        visible: true,
        message: customMessage,
      },
    });

    expect(wrapper.find('.dialog__message').text()).toBe(customMessage);
  });

  it('renders the spinner element', () => {
    const wrapper = mount(LoadingDialog, {
      props: {
        visible: true,
        message: "Loading, please wait...",
      },
    });

    expect(wrapper.find('.spinner').exists()).toBe(true);
  });

  it('has the correct default message when no message is provided', () => {
    const wrapper = mount(LoadingDialog, {
      props: {
        visible: true,
      },
    });

    expect(wrapper.find('.dialog__message').text()).toBe('Loading, please wait...');
  });
});

