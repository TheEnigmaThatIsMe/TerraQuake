import {Box, Typography} from "@mui/material";
import React from "react";

type DetailRowProps = {
    label: string;
    value: string | number | null | undefined;
};

export const DetailRow: React.FC<DetailRowProps> = ({ label, value }: { label: string, value: string | number | null | undefined}) => {
    if (!value) return null;
    return (
        <Box sx={{ display: 'flex', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {label}:&nbsp;
            </Typography>
            <Typography variant="body1">{value}</Typography>
        </Box>
    );
}

