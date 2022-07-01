import { Button, Form, Spin } from 'antd';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsArrowRight,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import section1Background from '../../assets/images/section-1-background.png';
import section2Banner1 from '../../assets/images/section-2_banner-1.jpg';
import section2Banner2 from '../../assets/images/section-2_banner-2.jpg';
import section2Banner3 from '../../assets/images/section-2_banner-3.jpg';
import section2Shape from '../../assets/images/section-2_shape.png';
import CardTour from '../../components/CardTour/CardTour';
import CardVoucher from '../../components/CardVoucher/CardVoucher';
import Search from '../../components/Search/Search';
import './Home.scss';

const Home = () => {
  const [formSearch] = Form.useForm();
  const [loadingDOM, setLoadingDOM] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    Aos.refresh();
    setLoadingDOM(false);
  }, []);

  const tour = {
    image:
      'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
    duration: 7,
    destination: 'Bryce Canyon National Park, USA',
    name: 'Waterfalls, Geysers and Glacier',
    price: 100,
    maxPeople: 40,
  };

  const onSearch = values => {
    console.log(values);
  };

  return (
    <Spin spinning={loadingDOM}>
      <div className="home-wrapper">
        <div className="section-1">
          <img
            className="section-1__bg"
            src={section1Background}
            alt="triply"
            data-aos="fade-left"
          />
          <div className="section-1__content">
            <h2 className="section-subtitle" data-aos="fade-right">
              Natural beauty
            </h2>
            <h1>Discover the most engaging places</h1>
            <button data-aos="fade-right">
              {t('cta.explore')}
              <BsArrowRight />
            </button>
          </div>
          <Search form={formSearch} onFinish={onSearch} />
        </div>
        <div className="section-2">
          <div className="section-2__title">
            <h2 className="section-subtitle" data-aos="fade-down">
              {t('home.offer.dont_miss')}
            </h2>
            <h1 className="section-title" data-aos="fade-up">
              {t('home.offer.special_offer')}
            </h1>
          </div>
          <div className="section-2__panel-voucher">
            <CardVoucher
              data-aos="fade-right"
              background={section2Banner1}
              title={t('home.offer.item_1.title')}
              subTitle={t('home.offer.item_1.sub_title')}
              buttonContent={t('home.offer.item_1.btn')}
              buttonOnClick={() => {}}
            />
            <CardVoucher
              data-aos="fade-up"
              background={section2Banner2}
              title={t('home.offer.item_2.title')}
              subTitle={t('home.offer.item_2.sub_title')}
              buttonContent={t('home.offer.item_2.btn')}
              buttonOnClick={() => {}}
            />
            <CardVoucher
              data-aos="fade-left"
              background={section2Banner3}
              title={t('home.offer.item_3.title')}
              subTitle={t('home.offer.item_3.sub_title')}
              buttonContent={t('home.offer.item_3.btn')}
              buttonOnClick={() => {}}
            />
          </div>
          <div className="section-2__auth">
            <img src={section2Shape} alt="auth" />
            <div className="section-2__auth__typho">
              <h2>{t('home.auth.title')}</h2>
              <p>{t('home.auth.content')}</p>
              <div className="section-2__auth__control">
                <Button
                  type="primary"
                  className="section-2__auth__control__btn"
                  data-aos="fade-left"
                >
                  {t('cta.login')} <BsArrowRight />
                </Button>
                <Button
                  className="section-2__auth__control__btn"
                  data-aos="fade-right"
                >
                  {t('cta.register')} <BsArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="section-3">
          <div className="section-2__title">
            <h2 className="section-subtitle" data-aos="fade-down">
              {t('home.popular_tour.title')}
            </h2>
            <h1 className="section-title" data-aos="fade-up">
              {t('home.popular_tour.content')}
            </h1>
          </div>
          <div className="section-3__content-wrapper">
            <CardTour tour={tour} tag={'featured'} />
            <CardTour tour={tour} tag={'featured'} />
            <CardTour tour={tour} tag={'featured'} />
            <CardTour tour={tour} tag={'featured'} />
            <CardTour tour={tour} tag={'featured'} />
            <CardTour tour={tour} tag={'featured'} />
          </div>
        </div>
        <div className="section-4">
          <div className="section-4__1st">
            <p className="section-4__text">{t('home.banner.telephone')}</p>
            <Link to="#" className="section-4__link">
              +(84) 1800 - 333 5555
            </Link>
          </div>
          <div className="section-4__2nd">
            <p style={{ opacity: '0' }}>a</p>
            <Link to="#" className="section-4__link">
              support@triply.com
            </Link>
          </div>

          <div className="section-4__follow-us">
            <p className="section-4__text">{t('home.banner.follow')}</p>
            <div className="section-4__wrapper-button">
              <Button
                className="section-4__button"
                icon={<BsFacebook />}
                shape="circle"
                size="large"
              />
              <Button
                className="section-4__button"
                icon={<BsTwitter />}
                shape="circle"
                size="large"
              />
              <Button
                className="section-4__button"
                icon={<BsYoutube />}
                size="large"
                shape="circle"
              />
              <Button
                className="section-4__button"
                icon={<BsInstagram />}
                size="large"
                shape="circle"
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Home;
