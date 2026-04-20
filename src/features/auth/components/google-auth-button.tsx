"use client";

import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Script from "next/script";
import * as React from "react";

import { authenticateWithGoogle } from "@/features/auth/services/auth-api";
import { authStorage } from "@/features/auth/utils/auth-storage";
import { resolveRedirectTarget } from "@/features/auth/utils/redirect";
import { getGoogleClientId } from "@/lib/env";
import { ApiError } from "@/lib/fetcher";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleButtonText = "signin_with" | "signup_with" | "continue_with" | "signin";

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    ux_mode?: "popup" | "redirect";
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "large" | "medium" | "small";
      text?: GoogleButtonText;
      shape?: "rectangular" | "pill" | "circle" | "square";
      logo_alignment?: "left" | "center";
      width?: number;
      locale?: string;
      state?: string;
    },
  ) => void;
};

type GoogleWindow = Window & {
  google?: {
    accounts?: {
      id?: GoogleAccountsId;
    };
  };
};

type GoogleAuthButtonProps = {
  mode: "login" | "register";
  redirectParam?: string | null;
  isDarkMode: boolean;
  helperText?: string;
};

const GOOGLE_SCRIPT_ID = "miraigo-google-identity";
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client?hl=vi";

const getGoogleAccountsId = () => (window as GoogleWindow).google?.accounts?.id;

export default function GoogleAuthButton({
  mode,
  redirectParam = null,
  isDarkMode,
  helperText,
}: GoogleAuthButtonProps) {
  const router = useRouter();
  const isPhone = useMediaQuery("(max-width:599.95px)", {
    noSsr: true,
  });
  const googleClientId = getGoogleClientId();
  const targetPath = resolveRedirectTarget(redirectParam);
  const buttonRef = React.useRef<HTMLDivElement | null>(null);
  const initializedRef = React.useRef(false);
  const [buttonWidth, setButtonWidth] = React.useState(0);
  const [scriptReady, setScriptReady] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: authenticateWithGoogle,
    onSuccess: (data) => {
      authStorage.setSession(data.token);
      router.replace(targetPath);
    },
  });

  const errorMessage =
    localError ??
    (mutation.error instanceof ApiError
      ? mutation.error.message
      : "Đăng nhập với Google thất bại. Vui lòng thử lại.");

  React.useEffect(() => {
    if (typeof window !== "undefined" && getGoogleAccountsId()) {
      setScriptReady(true);
    }
  }, []);

  React.useEffect(() => {
    const container = buttonRef.current;
    if (!container) {
      return;
    }

    const updateWidth = () => {
      const nextWidth = Math.max(220, Math.floor(container.clientWidth));
      setButtonWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth));
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    if (!scriptReady || !googleClientId || initializedRef.current) {
      return;
    }

    const googleAccountsId = getGoogleAccountsId();
    if (!googleAccountsId) {
      return;
    }

    googleAccountsId.initialize({
      client_id: googleClientId,
      callback: (response) => {
        const idToken = response.credential?.trim();
        if (!idToken) {
          setLocalError("Không nhận được mã xác thực từ Google. Vui lòng thử lại.");
          return;
        }

        setLocalError(null);
        mutation.mutate({ idToken });
      },
      ux_mode: "popup",
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    initializedRef.current = true;
  }, [googleClientId, mutation, scriptReady]);

  React.useEffect(() => {
    if (!scriptReady || !googleClientId || buttonWidth === 0) {
      return;
    }

    const googleAccountsId = getGoogleAccountsId();
    const container = buttonRef.current;
    if (!googleAccountsId || !container) {
      return;
    }

    container.innerHTML = "";
    googleAccountsId.renderButton(container, {
      type: "standard",
      theme: isDarkMode ? "filled_black" : "outline",
      size: isPhone ? "medium" : "large",
      text: mode === "register" ? "signup_with" : "signin_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: buttonWidth,
      locale: "vi",
      state: mode,
    });

    return () => {
      container.innerHTML = "";
    };
  }, [buttonWidth, googleClientId, isDarkMode, isPhone, mode, scriptReady]);

  if (!googleClientId) {
    if (process.env.NODE_ENV === "production") {
      return null;
    }

    return (
      <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary" }}>
        Thiếu `NEXT_PUBLIC_GOOGLE_CLIENT_ID` nên Google sign-in chưa hiển thị.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      <Script
        id={GOOGLE_SCRIPT_ID}
        src={GOOGLE_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <Divider>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          hoặc
        </Typography>
      </Divider>
      <div ref={buttonRef} className="min-h-[40px] w-full" />
      {helperText ? (
        <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary" }}>
          {helperText}
        </Typography>
      ) : null}
      {mutation.isPending ? (
        <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary" }}>
          Đang xác thực với Google...
        </Typography>
      ) : null}
      {mutation.isError || localError ? <Alert severity="error">{errorMessage}</Alert> : null}
    </Stack>
  );
}
