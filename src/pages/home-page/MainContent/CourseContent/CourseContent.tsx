import { Box } from "@mui/material";
import styles from "./CourseContent.module.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Link } from "react-router-dom";

interface ICourse {
    id: number;
    courseName: string;
    price: number;
    thumbnail: string;
    isFree: null;
    weeklyViews: number;
    monthlyViews: number;
    creatorId: string;
    creatorName: string;
    creatorPicture: string;
}

const CourseContent = ({ course }: { course: ICourse }) => {
    return (
        <Box className={styles.content}>
            <Box className={styles.wrapper}>
                <Link
                    className={styles.courseLink}
                    to={`/course-detail/${course.id}`}
                >
                    <img className={styles.pic} src={course.thumbnail} />
                </Link>
                <Box className={styles.body}>
                    <Link
                        className={styles.courseLink}
                        to={`/course-detail/${course.id}`}
                    >
                        {course.courseName}
                    </Link>
                    <p className={styles.title}>{course.creatorName}</p>

                    <div className={styles.priceWrapper}>
                        <strong className={styles.price}>
                            ₫{course.price}
                        </strong>
                        <span className={styles.delPrice}>
                            <del>₫1,599,000</del>
                        </span>
                    </div>
                    <span className={styles.btn}>Bestseler</span>
                </Box>
            </Box>
        </Box>
    );
};

export default CourseContent;
