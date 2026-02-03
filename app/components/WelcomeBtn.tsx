"use client";

import React, { JSX } from "react";
import Link from "next/link";

export default function WelcomeBtn(): JSX.Element {
    return (
        <>
            <Link href={'../welcome'}>
                <button className="mybtn" type="button">Welcome</button>           
            </Link>
        </>
    );
}