import React from 'react'
import Particles from 'react-particles-js';

const ParticlesPage = () => {
    return (
        <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 120
                        },
                        "size": {
                            "value": 3
                        },
                    },
                }}
            />
    )
}

export default ParticlesPage
