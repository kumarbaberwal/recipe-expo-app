import { colors } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    welcomeSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "800",
        color: colors.text,
        letterSpacing: -0.5,
    },
    featuredSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    featuredCard: {
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: colors.card,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 12,
    },
    featuredImageContainer: {
        height: 240,
        backgroundColor: colors.primary,
        position: "relative",
    },
    featuredImage: {
        width: "100%",
        height: "100%",
    },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "space-between",
        padding: 20,
    },
    featuredBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    featuredBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "600",
    },
    featuredContent: {
        justifyContent: "flex-end",
    },
    featuredTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: colors.white,
        marginBottom: 12,
        textShadowColor: "rgba(0,0,0,0.3)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    featuredMeta: {
        flexDirection: "row",
        gap: 16,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        color: colors.white,
        fontWeight: "600",
    },
    recipesSection: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.text,
        // letterSpacing: -0.5,
    },
    recipesGrid: {
        gap: 16,
    },
    row: {
        justifyContent: "space-between",
        gap: 16,
    },
    emptyState: {
        alignItems: "center",
        paddingVertical: 64,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 14,
        color: colors.textLight,
        textAlign: "center",
    },
    categoryFilterContainer: {
        marginVertical: 16,
    },
    categoryFilterScrollContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    categoryButton: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.card,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        minWidth: 80,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    selectedCategory: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        shadowOpacity: 0.15,
    },
    categoryImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 4,
        backgroundColor: colors.border,
    },
    selectedCategoryImage: {
        borderWidth: 2,
        borderColor: colors.white,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.text,
        textAlign: "center",
    },
    selectedCategoryText: {
        color: colors.white,
    },
});

export const recipeCardStyles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: colors.card,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        height: 140,
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.border,
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 4,
        lineHeight: 20,
    },
    description: {
        fontSize: 12,
        color: colors.textLight,
        marginBottom: 8,
        lineHeight: 16,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeText: {
        fontSize: 11,
        color: colors.textLight,
        marginLeft: 4,
        fontWeight: "500",
    },
    servingsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    servingsText: {
        fontSize: 11,
        color: colors.textLight,
        marginLeft: 4,
        fontWeight: "500",
    },
});