import { Button } from 'antd';
import Aos from 'aos';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getDestinationsServiceTours } from '../../app/toursSlice';
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
  // Redux
  const listTours = useSelector(state => state.tours.list);
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const dispatch = useDispatch();

  // React router
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    Aos.refresh();

    loading();
  }, []);

  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (
      listTours.length === 0 ||
      destinations.length === 0 ||
      services.length === 0
    )
      dispatch(getDestinationsServiceTours());
    //call method to indicate that loading is done
    loadingContext.done();
  };

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
    const searchParams = {};
    if (values.destinations) {
      searchParams.destination = values.destinations;
    }
    if (values.services) {
      searchParams.service = values.services;
    }

    if (values.when) {
      searchParams.startDate = moment(values.when).format('YYYY-MM-DD');
    }

    if (values.guests) {
      searchParams['guests[]'] = values['guests[]'];
    }

    if (searchParams) {
      navigate({
        pathname: '/tours',
        search: createSearchParams({
          ...searchParams,
          orderBy: 'asc',
        }).toString(),
      });
    } else navigate('/tours');
  };

  return (
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
          <button data-aos="fade-right" onClick={() => navigate('/tours')}>
            Explore Now
            <BsArrowRight />
          </button>
        </div>
        <Search
          onFinish={onSearch}
          destinations={destinations}
          services={services}
        />
      </div>
      <div className="section-2">
        <div className="section-2__title">
          <h2 className="section-subtitle">Don&apos;t Miss</h2>
          <h1 className="section-title">Specical Offers</h1>
        </div>
        <div className="section-2__panel-voucher">
          <CardVoucher
            data-aos="fade-right"
            background={section2Banner1}
            title={'Weekly Flash Deals'}
            subTitle={'Up to 30% off'}
            buttonContent={'View Deals'}
            buttonOnClick={() => navigate('/tours')}
          />
          <CardVoucher
            data-aos="fade-up"
            background={section2Banner2}
            title={'Summer Escapes'}
            subTitle={'Plan your next trip'}
            buttonContent={'Learn more'}
            buttonOnClick={() => navigate('/tours')}
          />
          <CardVoucher
            data-aos="fade-left"
            background={section2Banner3}
            title={'Exclusive Deals'}
            subTitle={'Want to save up to 50%'}
            buttonContent={'Subscribe Us'}
            buttonOnClick={() => navigate('/tours')}
          />
        </div>
        <div className="section-2__auth">
          <img src={section2Shape} alt="auth" />
          <div className="section-2__auth__typho">
            <h2>Not a Member Yet?</h2>
            <p>
              Join us! Our members can access savings of up to 50% and earn Trip
              Coins while booking.
            </p>
            <div className="section-2__auth__control">
              <Button
                type="primary"
                onClick={() => navigate('/login')}
                className="section-2__auth__control__btn"
                data-aos="fade-left"
              >
                Sign In <BsArrowRight />
              </Button>
              <Button
                className="section-2__auth__control__btn"
                data-aos="fade-right"
                onClick={() => navigate('/register')}
              >
                Register <BsArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="section-2__title">
          <h2 className="section-subtitle" data-aos="fade-down">
            What&apos;s new
          </h2>
          <h1 className="section-title" data-aos="fade-up">
            Popular Tours
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
    </div>
  );
};

export default Home;
