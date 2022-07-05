import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkout } from '../../app/checkoutSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import paypal from '../../assets/images/paypal-logo.png';
import stripe from '../../assets/images/stripe-logo.png';
import { ImageBreadcrumb, OrderDetail } from '../../components';
import './Checkout.scss';

const { Title } = Typography;
const { Option } = Select;

const Checkout = () => {
  const checkoutData = JSON.parse(localStorage.getItem('bookingInfo'));
  const [form] = Form.useForm();
  const [finalTotal, setFinalTotal] = useState(checkoutData.subTotal);
  const [idVoucher, setIdVoucher] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.checkout.loading);

  console.log(checkoutData);
  const onFinish = values => {
    const newValues = {
      orderId: checkoutData.id,
      tourId: checkoutData.tourId,
      voucherId: +idVoucher,
      scheduleId: checkoutData.scheduleId,
      totalPrice: finalTotal,
      discountPrice: values.discount,
      taxPrice: checkoutData.tax.percent,
      currency: localStorage.getItem('currencyItem').toLowerCase(),
      phone: values.phone,
      tourName: checkoutData.tourTitle,
      email: values.email,
      name: `${values.first_name} ${values.last_name}`,
    };
    console.log(newValues);

    dispatch(checkout(newValues));
  };

  const voucherDiscount = checkoutData.voucher.map(item => {
    return {
      id: item.id,
      title: item.code,
      value: item.discount,
    };
  });
  const handleChangeFinalTotal = (value, name) => {
    setIdVoucher(name.key);
    setDiscountValue(value);
    if (voucherDiscount && voucherDiscount.length > 0) {
      setFinalTotal(
        checkoutData.subTotal - (checkoutData.subTotal * value) / 100,
      );
    } else if (!value) {
      setFinalTotal(checkoutData.subTotal);
    }
  };
  return (
    <>
      <ImageBreadcrumb
        title={'Checkout'}
        breadcrumbBg={breadcrumbBg}
        currentPageTitle={'CHECKOUT'}
        beforePath={[{ title: 'HOME', path: '/' }]}
      />
      <div className="ctn ctn-checkout">
        <div className="ctn-checkout__left-ctn">
          <div className="ctn-checkout__left-ctn__title">
            <Title level={2}>Order #{checkoutData.id}</Title>
          </div>
          <OrderDetail
            data={checkoutData}
            finalTotal={finalTotal}
            discountValue={discountValue}
          />
        </div>

        <div className="ctn-checkout__right-ctn">
          <div className="ctn-checkout__right-ctn__title">
            <Title level={2}>Contact information</Title>
          </div>
          <div className="ctn-checkout__right-ctn__form">
            <Form
              form={form}
              layout="vertical"
              size="large"
              className="checkout-form"
              onFinish={onFinish}
              initialValues={{
                payment: 'stripe',
                discount: 0,
              }}
            >
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input placeholder="First name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input placeholder="Last name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'This field is not valid E-mail.',
                  },
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Input should contain just number!',
                  },
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}
              >
                <Input placeholder="Contact number" />
              </Form.Item>

              <Title level={2} className="payment-title">
                Payment Method
              </Title>

              <Form.Item name="payment">
                <Radio.Group>
                  <Radio value="stripe">
                    <div>
                      <img className="stripe-img" src={stripe} alt="stripe" />
                    </div>
                  </Radio>
                  <Radio value="paypal" disabled>
                    <Tooltip title="System will update later">
                      <div>
                        <img className="paypal-img" src={paypal} alt="paypal" />
                      </div>
                    </Tooltip>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="discount"
                label={<Title level={5}>Apply your voucher to discount!</Title>}
              >
                <Select
                  allowClear
                  onChange={handleChangeFinalTotal}
                  placeholder="Choose your voucher"
                >
                  {voucherDiscount.map(item => (
                    <Option name={item.id} key={item.id} value={item.value}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Divider />

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  htmlType="submit"
                  type="primary"
                  className="button-checkout-page"
                >
                  Complete My Order
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
