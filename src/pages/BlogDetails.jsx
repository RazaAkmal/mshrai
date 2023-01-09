import LogoHeader from "../components/LogoHeader";

import { Col, Container, Row } from "react-bootstrap";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogById } from "../features/blog/blogSlice";
import LoadingComponent from "../components/LoadingComponent";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = ({ selectedLng }) => {
  const dispatch = useDispatch();
  const id = useParams();
  const { specificById, isLoadingSpecificById, errorSpecificById } =
    useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch]);
  let content;
  if (isLoadingSpecificById) content = <LoadingComponent />;
  else if (errorSpecificById) content = <> Error Fetching Data..</>;
  else {
    content = (
      <Col>
        <BlogCard
          item={specificById?.post[0]}
          showDetails
          selectedLng={selectedLng}
        />
      </Col>
    );
  }
  return (
    <>
      <LogoHeader />
      <div className="page__title">
        <h2>
          {selectedLng === "ar"
            ? specificById?.post[0]?.title
            : specificById?.post[0]?.title_en}
        </h2>
      </div>
      <div className="cards__container">
        <Container>
          <Row>{content}</Row>
        </Container>
      </div>
    </>
  );
};

export default BlogDetails;
