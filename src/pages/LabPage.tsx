import { lazy, Suspense, type ComponentType } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getLabBySlug, type LabSlug } from "@/constants/labs";
import BackButton from "@/components/labs/BackButton";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { Loader2 } from "lucide-react";

// Explicit map (rather than a dynamic template import) so Vite can
// statically analyze and code-split each lab into its own chunk.
const LAB_COMPONENTS: Record<LabSlug, ComponentType> = {
	trudomistkist: lazy(() => import("@/features/lab1/Lab1")),
	"chyselnist-vykonavtsiv": lazy(() => import("@/features/lab2/Lab2")),
	"cocomo-vartist": lazy(() => import("@/features/lab3/Lab3")),
	"funkcionalni-tochky": lazy(() => import("@/features/lab4/Lab4")),
	"cocomo-post-architecture": lazy(() => import("@/features/lab5/Lab5")),
	"rozmir-programnoi-chastyny": lazy(() => import("@/features/lab6/Lab6")),
};

function LoadingFallback() {
	const { t } = useTranslation();
	return (
		<div className="flex items-center justify-center gap-3 py-24 text-blue-300">
			<Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
			<span>{t("loadingLab")}</span>
		</div>
	);
}

export default function LabPage() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const lab = getLabBySlug(slug);

	if (!lab) {
		return <Navigate to="/404" replace />;
	}

	const LabComponent = LAB_COMPONENTS[lab.slug];

	return (
		<main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
			<div className="animate-fade-in-up">
				<BackButton />
				<div className="bg-slate-800/30 backdrop-blur-md rounded-3xl border border-blue-500/20 p-4 sm:p-8 shadow-2xl">
					<ErrorBoundary onReset={() => navigate("/")} key={lab.slug}>
						<Suspense fallback={<LoadingFallback />}>
							<LabComponent />
						</Suspense>
					</ErrorBoundary>
				</div>
			</div>
		</main>
	);
}
