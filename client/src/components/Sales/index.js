import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import FadeIn from 'react-fade-in';

import './sales.scss';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [monthIsOpen, setMonthIsOpen] = useState(false);
  const [yearIsOpen, setYearIsOpen] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { authTokens } = useAuth();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  try {
    useEffect(() => {
      const fetchSales = async () => {
        const response = await axios.get('/api/sales', {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        });
        console.log(response.data);
        setSales(...sales, response.data.sales);
      };
      fetchSales();
    }, []);
  } catch (error) {
    setError(true);
    setErrorMessage(error.response.data.message);
  }

  const getMonth = (month) => {
    return months[month - 1];
  };

  const toggleAccordion = (month, year) => {
    if (month) {
      setMonth(month);
      setMonthIsOpen(!monthIsOpen);
    }
    if (year) {
      setYear(year);
      setYearIsOpen(!yearIsOpen);
    }
  };

  return (
    <main className="sales__container">
      <ol className="sales__grid">
        {sales.map((sale) => {
          return (
            <>
              <li
                className="year"
                onClick={() => toggleAccordion(null, sale._id.year)}
              >
                {sale._id.year}
              </li>
              {year === sale._id.year && yearIsOpen && (
                <FadeIn>
                  <ol className="sales__grid">
                    {sale.yearlySales.map((year) => {
                      return (
                        <>
                          <li
                            className="month"
                            onClick={() =>
                              toggleAccordion(getMonth(year.month), null)
                            }
                          >
                            {getMonth(year.month)}
                          </li>
                          {month === getMonth(year.month) && monthIsOpen && (
                            <FadeIn>
                              <ol className="grid__sub navy">
                                <li className="grid__sub--heading">Title</li>
                                <li className="grid__sub--heading">
                                  Edition Sold
                                </li>
                                <li className="grid__sub--heading">
                                  Total Edition
                                </li>
                                <li className="grid__sub--heading">Price</li>
                                <li className="grid__sub--heading">
                                  Date of Sale
                                </li>
                              </ol>
                              <ol className="grid__sub">
                                {year.monthlySales.map((unit) => {
                                  return (
                                    <>
                                      <li className="border">
                                        {unit.artwork.title}
                                      </li>
                                      <li className="border">
                                        {unit.editionSold}
                                      </li>
                                      <li className="border">
                                        {unit.artwork.totalEdition}
                                      </li>
                                      <li className="border">
                                        ${unit.artwork.price}.00
                                      </li>
                                      <li className="border">
                                        {new Date(
                                          unit.date
                                        ).toLocaleDateString()}
                                      </li>
                                    </>
                                  );
                                })}
                              </ol>
                            </FadeIn>
                          )}
                        </>
                      );
                    })}
                  </ol>
                </FadeIn>
              )}
            </>
          );
        })}
      </ol>
    </main>
  );
};

export default Sales;
