import React from 'react';
import FooterLayout from '../../Layouts/FooterLayout';

const About = () => {
    return (
        <FooterLayout>
            <section className=" min-h-screen py-16 px-8 text-gray-900 text-center">
                <h1 className="text-4xl text-white font-bold mb-8">O Gravecare</h1>
                <p className="max-w-screen-md mx-auto text-white text-lg leading-relaxed">
                    Gravecare je inovatívna platforma, ktorá spája poskytovateľov služieb s klientmi v oblasti údržby hrobov.
                    Naším cieľom je zabezpečiť, aby miesta posledného odpočinku vašich blízkych boli udržiavané a upravené,
                    čím vytvárame dôstojnú spomienku na milované osoby.
                </p>
            </section>
        </FooterLayout>
    );
};

export default About;
