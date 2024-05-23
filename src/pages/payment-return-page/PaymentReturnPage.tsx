import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import styles from "./PaymentReturnPage.module.scss";

type Props = {};

const PaymentReturnPage = (props: Props) => {
    // const params: { [key: string]: string } = {};
    // const [searchParams] = useSearchParams();
    // for (const [key, value] of searchParams.entries()) {
    //     params[key] = value;
    // }
    const searchParams = new URLSearchParams(useLocation().search);
    const paymentStatus = searchParams.get("PaymentStatus");
    console.log("searchParams:", searchParams.get("PaymentStatus"));
    let alertStatus: string = "";
    let alertMessage: string = "";
    switch (paymentStatus) {
        case "00":
            alertStatus = "success";
            alertMessage = "Payment has been successful!";
            break;

        case "10":
            alertStatus = "danger";
            alertMessage = "Payment has failed!";
            break;

        case "99":
        default:
            alertStatus = "warning";
            alertMessage = "Unknown payment status!";
            break;
    }
    return <Box className={styles.container}>{alertMessage}</Box>;
};

export default PaymentReturnPage;
