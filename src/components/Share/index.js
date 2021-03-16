import React from 'react'
import { FacebookShareButton, FacebookIcon } from 'react-share'

export default function Share({ sessionUrl }) {
    return (
        <div>
            <FacebookShareButton url={sessionUrl}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
        </div>
    )
}
