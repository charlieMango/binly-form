import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { SendOutlined, UserOutlined, HomeOutlined, PhoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
import 'react-phone-number-input/style.css';
import ReactInputMask from "react-input-mask";
import clientImg from '../../assets/client-img.jpg';
import courierImg from '../../assets/corier-img.jpg';
import mobAppImg from '../../assets/mobile-app.jpg';
import { supabase } from '../../libs/supabaseClient';


const ClientForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState<string>(''); // Состояние для номера телефона
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    // Проверка на наличие в localStorage, была ли отправлена форма
    useEffect(() => {
        const isFormSubmitted = localStorage.getItem("formSubmitted");
        if (isFormSubmitted === "true") {
            setFormSubmitted(true); // Если форма уже отправлена, показываем блок благодарности
        }
    }, []);

    const handleSubmit = async (values: any) => {

        console.log('values', values);

        setLoading(true);
        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        name: values.name,
                        phone: values.phone,
                        address: values.address,
                    }
                ]);  // выключаем RETURNING, чтобы не требовать SELECT-политику
            if (error) throw error;
            message.success("Ваш запрос успешно отправлен!");  // локализация
            form.resetFields();
            setFormSubmitted(true);
            localStorage.setItem("formSubmitted", "true");
        } catch (err: any) {
            console.error('Supabase insert error:', err);
            message.error("Ошибка при отправке. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value); // Получаем значение из события
    };

    // Проверка на заполненность всех обязательных полей
    const isFormValid = (): boolean => {
        const values = form.getFieldsValue();
        return values.name && values.address && values.phone; // Проверяем, что все обязательные поля заполнены
    };

    // Функция для рендеринга формы
    const renderForm = () => (
        <div className="p-8 md:p-12 md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                Освободи время для себя
            </h2>
            <p className="text-gray-600 mb-8">
                Заполните форму, чтобы заказать первый вынос.
                Попробуйте новый, удобный, домашний сервис.
            </p>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Ваше имя"
                    rules={[
                        { required: true, message: "Please enter your name" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Имя"
                        className="py-3 px-4 rounded-lg border-gray-300 text-sm"
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Ваш адрес"
                    rules={[
                        { required: true, message: "Please enter your address" },
                    ]}
                >
                    <Input
                        prefix={<HomeOutlined className="text-gray-400" />}
                        placeholder="Адрес"
                        className="py-3 px-4 rounded-lg border-gray-300 text-sm"
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Ваш телефон"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your phone number",
                        },
                    ]}
                >
                    <ReactInputMask
                        mask="+7-999-99-999-99" // Маска для ввода телефона
                        maskChar="_"
                        value={phone} // Привязка состояния
                        onChange={handlePhoneChange} // Обработчик изменений
                    >
                        {(inputProps: any) => (
                            <Input
                                {...inputProps}
                                prefix={<PhoneOutlined className="text-gray-400" />}
                                placeholder="Телефон"
                                className="py-3 px-4 rounded-lg border-gray-300 text-sm"
                            />
                        )}
                    </ReactInputMask>
                </Form.Item>
                <Form.Item className="mb-0 mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!isFormValid()}
                        className="ant-btn !rounded-button whitespace-nowrap bg-[#8C7D69] !hover:bg-[#7A6C5A] border-none text-white font-medium w-full !py-3 h-auto flex items-center justify-center text-base"
                    >
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex flex-col md:flex-row">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src={clientImg}
                        alt="Courier service"
                        className="w-full h-full object-cover object-top opacity-20"
                    />
                </div>
                <div className="container mx-auto px-6 py-16 z-10 flex flex-col md:flex-row items-center">
                    {/* Left Side - Image */}
                    <div className="w-full md:w-1/2 mb-10 md:mb-0">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src={courierImg}
                                alt="Trash collection service"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                    {/* Right Side - Text */}
                    <div className="w-full md:w-1/2 md:pl-16 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Освободи корзину одним нажатием
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                            Заказывайте вынос мусора через приложение — и забудьте про походы к контейнеру. Курьер заберёт пакет прямо от вашей двери.
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            icon={<SendOutlined />}
                            className="!rounded-button whitespace-nowrap bg-[#8C7D69] hover:bg-[#7A6C5A] border-none text-white font-medium px-8 py-6 h-auto flex items-center justify-center w-fit text-lg"
                            onClick={() =>
                                document
                                    .getElementById("request-form")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Оставить заявку
                        </Button>
                    </div>
                </div>
            </section>
            {/* Form Section */}
            <section id="request-form" className="py-20 bg-[#F5F2EA]">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2 overflow-hidden">
                                <img
                                    src={mobAppImg}
                                    alt="Using trash pickup app"
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>
                            {!formSubmitted ? renderForm() : (
                                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
                                    <CheckCircleOutlined style={{ color: "#4CAF50" }} className="text-6xl mb-6" />
                                    <h2 className="text-3xl font-bold mb-6">Спасибо за ваш запрос!</h2>
                                    <p className="text-lg text-gray-600">
                                        Мы получили ваш запрос и скоро с вами свяжемся.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Как это работает</h2>
                        <p className="text-xl text-gray-600">
                            Простые шаги для чистоты вашего дома
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 mb-6 rounded-full bg-[#F5F2EA] flex items-center justify-center">
                                <i className="fas fa-mobile-alt text-4xl text-[#8C7D69]"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">1. Закажите вынос</h3>
                            <p className="text-gray-600">
                                Заполните простую форму и выберете удобное время
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 mb-6 rounded-full bg-[#F5F2EA] flex items-center justify-center">
                                <i className="fas fa-trash-alt text-4xl text-[#8C7D69]"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">2. Приготовьте мусор</h3>
                            <p className="text-gray-600">
                                Оставьте ваш мусор за дверью
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 mb-6 rounded-full bg-[#F5F2EA] flex items-center justify-center">
                                <i className="fas fa-check-circle text-4xl text-[#8C7D69]"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">3. Остальное оставьте нам </h3>
                            <p className="text-gray-600">
                                Наш курьер заберет его, мы проверим правильность
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default ClientForm;
