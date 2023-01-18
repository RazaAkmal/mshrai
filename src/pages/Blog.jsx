import { useTranslation } from "react-i18next";
import { LogoHeader, LoadingComponent, BlogCard } from "../components";
import "../i18n";
import { Col, Container, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlogs } from "../features/blog/blogSlice";

const Blog = ({ selectedLng }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { data, isLoading, error } = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  const posts = data?.posts;
  let content;
  if (isLoading) content = <LoadingComponent />;
  else if (error) content = <> Error Fetching Data..</>;
  else {
    content = posts?.map((item) => (
      <Col sm={6} lg={4} xl={3} key={item.id}>
        <BlogCard item={item} selectedLng={selectedLng} />
      </Col>
    ));
  }
  return (
    <>
      <LogoHeader />
      <div className="page__title">
        <h2>{t("blogLink")}</h2>
      </div>
      <div className="cards__container">
        <Container>
          <Row>{content}</Row>
        </Container>
      </div>
    </>
  );
};

export default Blog;
