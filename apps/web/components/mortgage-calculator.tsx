'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

export function MortgageCalculator() {
    const [price, setPrice] = useState(500000);
    const [downPayment, setDownPayment] = useState(100000); // 20%
    const [rate, setRate] = useState(4.5);
    const [years, setYears] = useState(25);
    const [payment, setPayment] = useState(0);

    useEffect(() => {
        calculatePayment();
    }, [price, downPayment, rate, years]);

    const calculatePayment = () => {
        const principal = price - downPayment;
        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = years * 12;

        if (monthlyRate === 0) {
            setPayment(principal / numberOfPayments);
            return;
        }

        const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        setPayment(monthlyPayment);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-100">
            <div className="bg-[#734838] text-white p-6">
                <h3 className="text-center font-serif text-2xl font-bold">
                    Calculatrice Hypothécaire
                </h3>
            </div>
            <div className="p-6 space-y-6">
                <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Prix de la propriété
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#734838]">{price.toLocaleString()} $</span>
                    </div>
                    <input
                        type="range"
                        min={100000}
                        max={2000000}
                        step={5000}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#734838]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="downPayment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Mise de fonds
                    </label>
                    <div className="flex items-center gap-4">
                        <Input
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="bg-slate-50"
                        />
                        <span className="text-sm text-slate-500 whitespace-nowrap">
                            ({Math.round((downPayment / price) * 100)}%)
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="rate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Taux d'intérêt (%)
                        </label>
                        <Input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="bg-slate-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="years" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Amortissement (ans)
                        </label>
                        <select
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="15">15 ans</option>
                            <option value="20">20 ans</option>
                            <option value="25">25 ans</option>
                            <option value="30">30 ans</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 rounded-lg bg-[#F4F1EE] p-6 text-center">
                    <p className="text-sm font-medium text-[#734838]/80 mb-2">Paiement mensuel estimé</p>
                    <p className="text-4xl font-bold text-[#734838]">
                        {payment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
