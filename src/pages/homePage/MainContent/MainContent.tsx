import { Box } from "@mui/material";
import styles from "./MainContent.module.scss";
import CourseContent from "./CourseContent/CourseContent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MainContent = () => {
    const getAll = async () => {
        const reponse = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}api/v1/course/get-alls`
        );
        return reponse.data;
    };
    const { data } = useQuery({ queryKey: ["course"], queryFn: getAll });
    return (
        <Box className={styles.slider}>
            <h2 className={styles.title}>Learners are viewing</h2>
            <div className={styles.courseWrapper}>
                <CourseContent />
                <CourseContent />
                <CourseContent />
                <CourseContent />
                <CourseContent />
                {/* {data.map(item => <CourseContent course={data} key={data.id}/>)} */}
            </div>
        </Box>
    );
};

export default MainContent;
