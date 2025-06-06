import React, { useState, useEffect } from "react";
import { Button, Input, Form, Select, message, Checkbox } from "antd";
import { SendOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ReactInputMask from "react-input-mask";

import clientImg from "../../assets/client-img.jpg";
import courierImg from "../../assets/corier-img.jpg";
import mobAppImg from "../../assets/mobile-app.jpg";
import "react-phone-number-input/style.css";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import LeadCounter from "../../components/LeadCounter";

const DISTRICTS = [
  "Вахитовский район",
  "Авиастроительный район",
  "Кировский район",
  "Московский район",
  "Ново-Савиновский район",
  "Советский район",
  "Приволжский район",
] as const;

type District = (typeof DISTRICTS)[number];

interface FormValues {
  name: string;
  phone: string;
  address: string;
  district: District;
  agreement: boolean;
}

const ClientForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const agreementChecked = Form.useWatch("agreement", form);

  useEffect(() => {
    if (localStorage.getItem("formSubmitted") === "true") {
      setFormSubmitted(true);
    }
  }, []);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const response = await fetch("http://158.160.129.113:3000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: "+7" + values.phone.replace(/\D/g, "").slice(1),
          district: values.district,
          address: values.address || "Адрес не указан",
          consent: true,
        }),
      });

      if (!response.ok) throw new Error("Сервер вернул ошибку");

      const result = await response.json();
      console.log("✅ Успешно:", result);

      message.success("Ваш запрос успешно отправлен!");
      form.resetFields();
      setFormSubmitted(true);
      localStorage.setItem("formSubmitted", "true");

      setTimeout(() => {
        window.open("https://t.me/binly_official", "_blank");
      }, 1000);

      setTimeout(() => {
        document.getElementById("success-block")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      message.error("Ошибка при отправке. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <div id="form-content" className="p-6 md:p-10 w-full md:w-1/2">
      <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
        Освободи время для себя
      </h2>
      <p className="text-gray-600 mb-6 text-center md:text-left">
        Заполните форму, чтобы попробовать новый, удобный, домашний сервис.
      </p>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input
            placeholder="Имя"
            className="py-3 px-4 rounded-lg border-gray-300 text-sm"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[{ required: true, message: "Введите номер телефона" }]}
        >
          <ReactInputMask mask="+7-999-99-999-99" maskChar="">
            {(inputProps) => (
              <input
                {...inputProps}
                className="custom-input w-full py-3 px-4 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#8C7D69] transition"
                placeholder="Телефон"
              />
            )}
          </ReactInputMask>
        </Form.Item>

        <Form.Item
          name="district"
          label="Район"
          rules={[{ required: true, message: "Пожалуйста, выберите район" }]}
        >
          <Select<District>
            placeholder="Выберите район"
            showSearch
            optionFilterProp="label"
            options={DISTRICTS.map((d) => ({ label: d, value: d }))}
          />
        </Form.Item>

        <Form.Item name="address" label="Ваш адрес">
          <Input
            placeholder="Адрес"
            className="py-3 px-4 rounded-lg border-gray-300 text-sm"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Вы должны дать согласие на обработку данных",
            },
          ]}
        >
          <Checkbox>
            Я даю согласие на обработку персональных данных в соответствии с{" "}
            <span
              onClick={() => setPrivacyVisible(true)}
              className="text-[#8C7D69] underline cursor-pointer"
            >
              Политикой конфиденциальности
            </span>
          </Checkbox>
        </Form.Item>

        <Form.Item shouldUpdate className="mt-6 mb-0">
          {() => {
            const hasErrors = form
              .getFieldsError(["name", "phone", "district", "agreement"])
              .some((field) => field.errors.length > 0);
            const allTouched = form.isFieldsTouched(
              ["name", "phone", "district", "agreement"],
              true
            );

            return (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!allTouched || hasErrors || !agreementChecked}
                className="ant-btn !rounded-button whitespace-nowrap bg-[#8C7D69] !hover:bg-[#7A6C5A] border-none text-white font-medium w-full !py-3 h-auto flex items-center justify-center text-base"
                icon={<SendOutlined />}
              >
                Отправить
              </Button>
            );
          }}
        </Form.Item>
      </Form>

      <PrivacyPolicyModal
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={clientImg}
            alt="Courier service"
            className="w-full h-full object-cover object-top opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 py-16 z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pl-16 flex flex-col justify-center items-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Освободи своё время: идеальное решение для домашней гармонии
            </h1>
            <p className="text-lg md:text-xl mb-4 text-gray-600 leading-relaxed">
              Заказывайте вынос мусора через приложение — и освободите свое
              время. Идеальный помощник для вашего комфорта и чистоты.
            </p>

            <p className="text-center md:text-left text-[#8C7D69] bg-[#F5F2EA] px-4 py-2 border-l-4 border-[#8C7D69] mb-6 rounded">
              <span className="font-bold"> от 149 ₽</span> за 1 вынос
            </p>

            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              className="!rounded-button whitespace-nowrap bg-[#8C7D69] hover:bg-[#7A6C5A] border-none text-white font-medium my-10 px-8 py-6 h-auto flex items-center justify-center w-fit text-lg"
              onClick={() =>
                document
                  .getElementById("form-content")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Заказать услугу
            </Button>

            <div>
              <LeadCounter />
            </div>
          </div>
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={courierImg}
                alt="Trash collection service"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Как это работает</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-[#F5F2EA] flex items-center justify-center">
                <i className="fas fa-mobile-alt text-4xl text-[#8C7D69]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">1. Закажите вынос</h3>
              <p className="text-gray-600">
                Заполните простую форму и выберете удобное время
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-[#F5F2EA] flex items-center justify-center">
                <i className="fas fa-trash-alt text-4xl text-[#8C7D69]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">2. Приготовьте мусор</h3>
              <p className="text-gray-600">Оставьте ваши пакеты за дверью</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-[#F5F2EA] flex items-center justify-center">
                <i className="fas fa-check-circle text-4xl text-[#8C7D69]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                3. Остальное оставьте нам
              </h3>
              <p className="text-gray-600">
                После оплаты курьер заберет пакеты в удобное для вас время
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="request-form" className="py-24 bg-[#F5F2EA]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex" id="success-block">
              <div className="md:w-1/2">
                <img
                  src={mobAppImg}
                  alt="Using trash pickup app"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {!formSubmitted ? (
                renderForm()
              ) : (
                <div className="w-full md:w-1/2 min-h-[500px] flex items-center justify-center p-8 md:p-12">
                  <div className="text-center">
                    <CheckCircleOutlined
                      style={{ color: "#4CAF50" }}
                      className="text-6xl mb-6"
                    />
                    <h2 className="text-3xl font-bold mb-4">
                      Спасибо за ваш запрос!
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                      Мы получили ваш запрос и скоро с вами свяжемся.
                    </p>
                    <p className="text-sm text-gray-500">
                      После запуска приложения мы оповестим вас в чат-боте.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientForm;
