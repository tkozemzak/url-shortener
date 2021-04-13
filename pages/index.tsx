import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Alert, Button, Form, Input, Layout, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

type ShortenLinkResponse = {
  short_link: string;
};

type ShortenLinkError = {
  error: string;
  error_description: string;
};

type FormValues = {
  link: string;
};

export default function Home() {
  const [status, setStatus] = useState<"initial" | "error" | "success">(
    "initial"
  );
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();

  const onFinish = async ({ link }: FormValues) => {
    try {
      const response = await axios.post<ShortenLinkResponse>(
        "/api/shorten_link",
        { link }
      );

      setStatus("success");
      setMessage(response.data?.short_link);
    } catch (e) {
      const error = e as AxiosError<ShortenLinkError>;
      setStatus("error");
      setMessage(
        error.response?.data?.error_description || "Something went wrong."
      );
    }
  };

  return <div className={styles.container}></div>;
}
